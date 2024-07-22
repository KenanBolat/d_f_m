import pymongo
import requests
import os
import gridfs
from bson.objectid import ObjectId

import time
from datetime import datetime, timedelta

MONGO_URI = "mongodb://localhost:27017/"  # Update this to your MongoDB URI
DB_NAME = "geotiff"
COLLECTION_NAME = "fs.files"
DOWNLOAD_FOLDER = "/home/knn/Desktop/d_f_m/j_data/geoserver_data/data/"
POLL_INTERVAL = 60  # Poll interval in seconds


client = pymongo.MongoClient(MONGO_URI)
db = client[DB_NAME]
collection = db[COLLECTION_NAME]


def download_file(file_id):

    fs = gridfs.GridFS(db)
    file_data = fs.get(ObjectId(file_id))
    destination_path = os.path.join(DOWNLOAD_FOLDER, file_data.filename)

    with open(destination_path, 'wb') as file:
        file.write(file_data.read())

    print(f"File {file_data.filename} downloaded to {destination_path}")


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
