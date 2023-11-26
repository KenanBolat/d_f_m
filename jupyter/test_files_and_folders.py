import ftplib
import re


def list_ftp_dir(ftp, path):
    """ Lists a directory on the FTP server. """
    file_list = []
    ftp.dir(path, file_list.append)
    return file_list


def parse_directory_listing(listing):
    """ Parses the FTP directory listing to extract directory names. """
    directories = []
    for item in listing:
        # Regular expression to match directories (assuming Unix-style FTP listing)
        match = re.match(r'^[drwx-]+\s+\d+\s+\w+\s+\w+\s+\d+\s+\w+\s+\d+\s+[\d:]+\s+(.+)$', item)
        if match:
            directories.append(match.group(1))
    return directories


def is_valid_timestamped_dir(dirname):
    """ Checks if the directory name is a valid timestamp. """
    # Adjust the regular expression pattern to match your timestamp format
    return re.match(r'^\d{12}$', dirname) is not None


def check_subdirectories(ftp, timestamp_dir):
    """ Checks for required subdirectories in a timestamped directory. """
    required_subdirs = ['_________', 'HRV______', 'IR_016___', 'IR_039___', 'IR_087___', 'IR_097___', 'IR_108___',
                        'IR_120___', 'IR_134___', 'VIS006___', 'VIS008___', 'WV_062___',
                        'WV_073___', ]  # Add more as needed

    path = f"/IODC/{timestamp_dir}"
    subdirs = parse_directory_listing(list_ftp_dir(ftp, path))

    return all(subdir in subdirs for subdir in required_subdirs)


# Main routine
ftp_server = 'localhost'
username = 'foo'
password = 'bar'
port=201

try:
    ftp = ftplib.FTP()
    ftp.connect(ftp_server, port)
    ftp.login(username, password,)

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
