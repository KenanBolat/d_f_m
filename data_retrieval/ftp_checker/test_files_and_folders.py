import datetime
import ftplib
import json
import re
import requests


class CheckProducts(object):
    def __init__(self):
        self._satellite_mission = None
        self.host = 'localhost:8000'  # Main server host
        self.ftp = ftplib.FTP()
        self.config = None  # Configuration of the mission
        self.available_missions = [row['satellite_mission'] for row in self.get_missions()[0]]  # List of missions
        self.file_list = None  # List of files in the FTP server

    def satellite_mission(self, satellite_mission):
        self._satellite_mission = satellite_mission
        self.config = self.get_config()[0]

    def folder_list(self):
        return self.config['folder_locations'].values()

    def get_config(self):
        if self._satellite_mission not in self.available_missions or self._satellite_mission is None:
            print(f"Invalid mission name: {self._satellite_mission}")
            assert "Invalid mission name"

        response = requests.get(f"http://{self.host}/api/configuration/{self._satellite_mission}")
        try:
            if response.status_code == 200:
                return response.json(), None
        except Exception as e:
            print(e)
            return None, (response.text, response.status_code)

    def get_missions(self):
        response = requests.get(f"http://{self.host}/api/configuration")
        try:
            if response.status_code == 200:
                return response.json(), None
        except Exception as e:
            print(e)
            return None, (response.text, response.status_code)

    def connect(self):
        if self.config:
            self.ftp = ftplib.FTP()
            self.ftp.connect(self.config['ftp_server'], self.config['ftp_port'])
            self.ftp.login(self.config['ftp_user_name'], self.config['ftp_password'])

    def list_ftp_dir(self, path):
        """ Lists a directory on the FTP server. """
        file_list = []
        self.ftp.dir(path, file_list.append)
        return file_list

    def list_files(self, path):
        """ Lists files in the specified directory. """
        self.connect()
        file_paths = []
        items = []
        try:
            items = self.ftp.nlst(path)
        except Exception as e:
            # Handle error if necessary (e.g., no permission to list directory)
            print(e)

        for item in items:
            # full_path = f"{path}/{item}" if path != '/' else f"/{item}"
            full_path = f"{item}"
            if self.is_directory(full_path):
                file_paths.extend(self.list_files(full_path))
            else:
                file_paths.append(full_path)
        # self.ftp.quit()
        return file_paths

    def is_directory(self, path):
        c = self.ftp.pwd()
        try:
            self.ftp.cwd(path)
            self.ftp.cwd(c)  # If we can change directory, it's not a file
            return True
        except BaseException as e:
            # If there's an exception, it's probably a file
            print(e)
            return False

    @staticmethod
    def parse_directory_listing(listing):
        """ Parses the FTP directory listing to extract directory names. """
        directories = []
        for item in listing:
            # Regular expression to match directories (assuming Unix-style FTP listing)
            match = re.match(r'^[drwx-]+\s+\d+\s+\w+\s+\w+\s+\d+\s+\w+\s+\d+\s+[\d:]+\s+(.+)$', item)
            if match:
                directories.append(match.group(1))
        return directories

    @staticmethod
    def is_valid_timestamped_dir(dirname):
        """ Checks if the directory name is a valid timestamp. """
        # Adjust the regular expression pattern to match your timestamp format
        return re.match(r'^\d{12}$', dirname) is not None

    def check_subdirectories(self, timestamp_dir):
        """ Checks for required subdirectories in a timestamped directory. """
        required_subdirs = self.config['folder_locations'].values()

        path = f"/{self._satellite_mission}/{timestamp_dir}"
        subdirs = self.parse_directory_listing(self.list_ftp_dir(path))

        return all(subdir in subdirs for subdir in required_subdirs)

    # Main routine
    def check(self):
        if self._satellite_mission not in self.available_missions or self._satellite_mission is None:
            print(f"Invalid mission name: {self._satellite_mission}")
            assert "Invalid mission name"

        try:
            self.connect()

            # List the root directory or the specific directory where the timestamped folders are expected
            root_dir_listing = self.list_ftp_dir(f'/{self._satellite_mission}')
            timestamped_dirs = [dir for dir in self.parse_directory_listing(root_dir_listing) if
                                self.is_valid_timestamped_dir(dir)]
            tmp = []
            for timestamp_dir in timestamped_dirs:
                if self.check_subdirectories(timestamp_dir):
                    print(f"All required subdirectories found in {timestamp_dir}")
                    tmp.append(timestamp_dir)
                else:
                    print(f"Missing subdirectories in {timestamp_dir}")

            self.ftp.quit()
            res = {self._satellite_mission: tmp}
            print(res)
            return res
        except ftplib.all_errors as e:
            print(f"FTP error: {e}")

    def get_processed_files(self, status=None, date_tag=None):
        params = {'satellite_mission': self._satellite_mission,
                  'status': status,
                  'date_tag': date_tag}
        token = 'f4206d39b62d861d105c7b3f184a73dd61782713'
        headers = {'Authorization': f'Token {token}'}
        response = requests.get(f"http://{self.host}/api/data/", params=params, headers=headers)
        if response.status_code == 200:
            return response.json(), None

    def upsert_data(self, status, files=None, date_tag=None):
        data = {'satellite_mission': self._satellite_mission,
                'status': status,
                'date_tag': date_tag,
                'files': files}
        token = 'f4206d39b62d861d105c7b3f184a73dd61782713'
        headers = {'Authorization': f'Token {token}', 'Content-Type': 'application/json'}

        if id := self.get_processed_files(date_tag=date_tag)[0]:

            response = requests.patch(f"http://{self.host}/api/data/{id[0]['id']}/", data=json.dumps(data),
                                      headers=headers)
        else:
            response = requests.post(f"http://{self.host}/api/data/", data=json.dumps(data), headers=headers)

        return response.status_code


if __name__ == '__main__':
    a = CheckProducts()
    a.get_missions()

    for mission in a.available_missions:
        print(f"[ {str(datetime.datetime.now())} ]Checking mission: {mission}")
        a.satellite_mission(mission)
        # get all the files in the ftp server that are ready to be downloaded for each mission
        ftp_ready = a.check()
        ftp_ready_dates = ftp_ready[mission]
        c = a.get_processed_files()[0]
        dates_ = [row['date_tag'] for row in c if row['status'] not in ['processing', 'downloading', 'ready']]
        for date_ in ftp_ready_dates:
            if date_ not in dates_:
                print(f'checking data  for {mission} and date {date_} ')

                files = a.list_files(f'/{mission}/{date_}/')
                a.upsert_data('ready', files, date_)
            else:
                print(f'files for {mission} and date {date_} already exist')

        # l['mission]

        a.get_processed_files('202308140600')
        print(f"[ {str(datetime.datetime.now())} ]Done checking mission: {mission}")
        print('-----------------------------------------------')
