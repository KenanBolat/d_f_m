import ftplib
import re
import requests


class CheckProducts(object):
    def __init__(self, satellite_mission):
        self.satellite_mission = satellite_mission
        self.host = 'localhost:8000'  # Main server host
        self.ftp = ftplib.FTP()
        self.config = self.get_config()[0]
        self.missions = [row['satellite_mission'] for row in self.get_missions()[0]] # List of missions

    def get_config(self):

        response = requests.get(f"http://{self.host}/api/configuration/{self.satellite_mission}")
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
            self.ftp.login(self.config['ftp_user_name'],self.config['ftp_password'])


    def list_ftp_dir(self, path):
        """ Lists a directory on the FTP server. """
        file_list = []
        self.ftp.dir(path, file_list.append)
        return file_list

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

    def get_sub_directory(self):

        response = requests.get(f"http://{self.host}/api/configuration/{self.satellite_mission}")
        try:
            if response.status_code == 200:
                return response.json()['folder_locations'], None
        except:
            return None, (response.text, response.status_code)

    def check_subdirectories(self, timestamp_dir):
        """ Checks for required subdirectories in a timestamped directory. """
        required_subdirs = self.get_sub_directory()

        path = f"/{self.satellite_mission}/{timestamp_dir}"
        subdirs = self.parse_directory_listing(self.list_ftp_dir(path))

        return all(subdir in subdirs for subdir in required_subdirs)

    # Main routine
    def main(self):

        try:
            self.connect()

            # List the root directory or the specific directory where the timestamped folders are expected
            root_dir_listing = self.list_ftp_dir(f'/{self.satellite_mission}')
            timestamped_dirs = [dir for dir in self.parse_directory_listing(root_dir_listing) if self.is_valid_timestamped_dir(dir)]

            for timestamp_dir in timestamped_dirs:
                if self.check_subdirectories(timestamp_dir):
                    print(f"All required subdirectories found in {timestamp_dir}")
                else:
                    print(f"Missing subdirectories in {timestamp_dir}")

            self.ftp.quit()
        except ftplib.all_errors as e:
            print(f"FTP error: {e}")


if __name__ == '__main__':

    a = CheckProducts('MSG')
    a.main()
    b = a.get_missions()
    # CheckProducts('IODC').main()
    # CheckProducts('IODC2').main()