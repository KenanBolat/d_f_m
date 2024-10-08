import os
import shutil
import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler, FileMovedEvent
from collections import defaultdict
from datetime import datetime, timedelta
import pandas as pd
import glob
import json
import logging
import logging.handlers


from logstash_formatter import LogstashFormatterV1


class JSONLogstashHandler(logging.handlers.SocketHandler):
    def makePickle(self, record):
        extra_record_fields = ['mission',
                               'timestamp',
                               'channel',
                               'file_name', 'xyz']

        log_record = {
            'appname': 'wathcer',
            'timestamp': datetime.now().isoformat(),
            'loglevel': record.levelname,
            'message': record.getMessage()

        }
        # Include additional fields from the extra dictionary

        log_record.update(record.__dict__)
        return (json.dumps(log_record) + '\n').encode('utf-8')


logger = logging.getLogger('python-logstash-logger')
logger.setLevel(logging.INFO)
logstash_handler = JSONLogstashHandler(os.environ.get('LOGSTASH_HOST', 'localhost'), 5044)  # Logstash service in Docker
logstash_handler.setFormatter(LogstashFormatterV1())
logger.addHandler(logstash_handler)

# Configure logging

logging.basicConfig(
    filename='.app.log',
    level=logging.INFO,
    format='%(asctime)s %(levelname)s %(message)s'
)

IDLE_TIME = timedelta(minutes=20)


class FileHandler(FileSystemEventHandler):
    def __init__(self, watch_dir, temp_dir, final_dir):
        self.watch_dir = watch_dir
        self.temp_dir = temp_dir
        self.final_dir = final_dir
        self.threshold_value = {'MSG': 114,
                                'IODC': 114,
                                'RSS': 44, 'Unknown': 14}
        self.files_collected = defaultdict(lambda: defaultdict(lambda: defaultdict(list)))
        self.df = pd.DataFrame(columns=['mission', 'timestamp', 'channel', 'file_name', 'last_modified'])
        self.last_modification = defaultdict(lambda: datetime.now())

    def log_event(self, message):
        logging.info(message)

    def process(self, file_path):
        try:
            file_name = os.path.basename(file_path)
            parts = file_name.split('-')
            timestamp = parts[-2]
            channel = parts[-4]

            mission = None

            if parts[-5] == 'MSG3________':
                mission = 'MSG'
            elif parts[-5] == 'MSG2_IODC___':
                mission = 'IODC'
            elif parts[-5] == 'MSG4_RSS____':
                mission = 'RSS'
            else:
                mission = 'Unknown'
                raise ValueError(f"Unknown mission: {parts[-5]}")

            # Create temp directories
            mission_dir = os.path.join(self.temp_dir, mission)
            date_dir = os.path.join(mission_dir, timestamp)
            channel_dir = os.path.join(date_dir, channel)

            if not os.path.exists(channel_dir):
                os.makedirs(channel_dir)

            # Move the file to temp location
            shutil.move(file_path, os.path.join(channel_dir, file_name))
            print(f"Moved {file_name} to temporary location {os.path.join(channel_dir, file_name)}")
            logger.info(f"Moved {file_name} to temporary location {os.path.join(channel_dir, file_name)}",
                        extra={'mission': mission, 'timestamp': timestamp, 'channel': channel, 'file_name': file_name})
            # Track files collected and update last modification time

            # Update DataFrame
            new_entry = pd.DataFrame({
                'mission': [mission],
                'timestamp': [timestamp],
                'channel': [channel],
                'file_name': [file_name],
                'last_modified': [datetime.now()]
            })
            self.df = pd.concat([self.df, new_entry], ignore_index=True)
            self.last_modification[timestamp] = datetime.now()
        except BaseException as e:
            print(f"Error occurred: {e}")
            logger.error(f"Error occurred: {e} while processing {file_path}")

    def on_created(self, event):
        if event.src_path.endswith(('.TEMP', '.temp')) or event.is_directory:
            return
        self.process(event.src_path)

    def existing_files(self):
        for file in glob.glob(f"{self.watch_dir}/*"):
            if os.path.isdir(file) or file.endswith('.TEMP'):
                continue
            self.process(file)

    def on_moved(self, event):
        if not isinstance(event, FileMovedEvent):
            return
        self.process(event.dest_path)

    def check_data(self):
        grouped_df = self.df.groupby(['mission', 'timestamp', 'channel'])['file_name'].nunique().unstack()
        sum_df = grouped_df.sum(axis=1).reset_index()
        filtered_df_list = []
        for mission, threshold in self.threshold_value.items():
            mission_df = sum_df[sum_df['mission'] == mission]
            mission_filtered_df = mission_df[mission_df[0] == threshold]
            if not mission_filtered_df.empty:
                filtered_df_list.extend(mission_filtered_df.values.tolist())
        return filtered_df_list

    def move_to_final(self):
        data_ready = self.check_data()
        for data in data_ready:
            try:
                print(data)
                logger.info(data)
                mission, timestamp = data[0], data[1]
                temp_channel_dir = os.path.join(self.temp_dir, mission, timestamp)
                final_channel_dir = os.path.join(self.final_dir, mission)
                if not os.path.exists(final_channel_dir):
                    os.makedirs(final_channel_dir)
                dest = shutil.move(temp_channel_dir, final_channel_dir)
                print(f"Moved {temp_channel_dir} to final location {final_channel_dir}")
                logger.info(f"Moved {temp_channel_dir} to final location {final_channel_dir}")
                if dest:
                    self.df = self.df[~((self.df['mission'] == mission) & (self.df['timestamp'] == timestamp))]
            except Exception as e:
                print(f"Error occurred: {e}")
                logger.error(f"Error occurred: {e}")


def monitor_directory(watch_dir, temp_dir, final_dir):
    event_handler = FileHandler(watch_dir, temp_dir, final_dir)
    event_handler.existing_files()
    observer = Observer()
    observer.schedule(event_handler, watch_dir, recursive=False)
    observer.start()
    print(f"Monitoring {watch_dir} for changes...")
    logger.info(f"Monitoring {watch_dir} for changes...")

    try:
        while True:
            time.sleep(30)
            event_handler.move_to_final()  # Check and move collected files to final destination
    except KeyboardInterrupt:
        logger.error("Monitoring Stopped. Exiting...")
        observer.stop()
    observer.join()


if __name__ == "__main__":

    watch_directory = r"/data"  # Directory to monitor
    # watch_directory = r"/media/knn/New Volume/Test_Data"  # Directory to monitor
    temp_directory = os.path.join(watch_directory, ".temp")  # Temporary directory for organizing files
    final_directory = watch_directory  # Final destination directory

    monitor_directory(watch_directory, temp_directory, final_directory)
