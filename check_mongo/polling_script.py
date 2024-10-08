import pymongo
import os
import gridfs
import re  # Regular expressions
from bson.objectid import ObjectId

import time
from datetime import datetime, timedelta

MONGO_URI = f"mongodb://{os.environ.get('MONGODB', 'localhost')}:27017/"  # Update this to your MongoDB URI
DB_NAME = "geotiff"
COLLECTION_NAME = "fs.files"
DOWNLOAD_FOLDER = f"/watch/data"
POLL_INTERVAL = 60  # Poll interval in seconds
RGB_LIST = ['natural_color',
            'day_microphysics',
            'ash',
            'airmass',
            'convection',
            'dust',
            'fog',
            'natural_color',
            'night_microphysics',
            'natural_with_night_fog',
            'snow']

client = pymongo.MongoClient(MONGO_URI)
db = client[DB_NAME]
collection = db[COLLECTION_NAME]


def download_file(file_id):
    print(f"Downloading file {file_id}")
    fs = gridfs.GridFS(db)
    file_data = fs.get(ObjectId(file_id))
    scope = None

    if file_data.filename.__contains__("aoi.tif"):
        scope = "aoi"
        # if file_data.filename.__contains__("natural_color"):
        match_ = re.findall('(?<=[0-9]{12}_).+?(?=_aoi)', file_data.filename)[0]
        if match_ in RGB_LIST:
            scope = "rgb"
        if file_data.filename.__contains__("ir_cloud_day"):
            scope = "cloud"
    if scope is not None:
        destination_path = os.path.join(DOWNLOAD_FOLDER, scope, file_data.filename)

        print(f"Saving file to {destination_path}")

        with open(destination_path, 'wb') as file:
            file.write(file_data.read())

        print(f"File {file_data.filename} downloaded to {destination_path}")
    else:
        print(f"File {file_data.filename} is not going to be used by the geoserver.")


def poll_collection():
    last_check = datetime.now() - timedelta(days=1)

    while True:
        new_files = collection.find({"uploadDate": {"$gte": last_check}})
        print(f"Found  new files")
        for file in new_files:
            file_id = file['_id']
            download_file(file_id)

        last_check = datetime.utcnow()
        time.sleep(POLL_INTERVAL)


if __name__ == "__main__":
    poll_collection()
