import ftplib
import re
import requests


class CheckProducts(object):
    def __init__(self, satellite_mission):
        self.satellite_mission = satellite_mission
        self.host = 'localhost:8000'
        self.



    def list_ftp_dir(self, ftp, path):
        """ Lists a directory on the FTP server. """
        file_list = []
        self.ftp.dir(self.path, file_list.append)
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

    def check_subdirectories(self, ftp, timestamp_dir):
        """ Checks for required subdirectories in a timestamped directory. """
        required_subdirs = self.get_sub_directory()

        path = f"/{self.satellite_mission}/{timestamp_dir}"
        subdirs = self.parse_directory_listing(self.list_ftp_dir(self.ftp, path))

        return all(subdir in subdirs for subdir in required_subdirs)

    # Main routine
    ftp_server = 'localhost'
    username = 'foo'
    password = 'bar'
    port = 201

    try:
        ftp = ftplib.FTP()
        ftp.connect(ftp_server, port)
        ftp.login(username, password, )

        # List the root directory or the specific directory where the timestamped folders are expected
        root_dir_listing = list_ftp_dir(ftp, '/IODC')
        timestamped_dirs = [dir for dir in parse_directory_listing(root_dir_listing) if is_valid_timestamped_dir(dir)]

        for timestamp_dir in timestamped_dirs:
            if check_subdirectories(ftp, timestamp_dir):
                print(f"All required subdirectories found in {timestamp_dir}")
            else:
                print(f"Missing subdirectories in {timestamp_dir}")

        ftp.quit()
    except ftplib.all_errors as e:
        print(f"FTP error: {e}")
