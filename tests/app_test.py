from locust import HttpUser, task, between
import os
import requests
import uuid
from pymongo import MongoClient
from gridfs import GridFS
import json


class FileUploadUser(HttpUser):
    wait_time = between(1, 3)  # Pause between requests to mimic real users
    print("FileUploadUser ==> User created...")

    @task
    def upload_file(self):
        print(self.client)
        # Path to the file to upload
        file_path = r"/home/knn/Desktop/b.png"  # Adjust with your file path

        # Ensure the file exists
        if not os.path.exists(file_path):
            print(f"File not found: {file_path}")
            return

        with open(file_path, "rb") as file:

            # Perform the file upload
            files = {"image": (f"a_{uuid.uuid4()}.png", file, "image/png")}  # Adjust as needed
            print(files)
            response = requests.post("http://localhost:8000/api/upload/",
                                     data={"title": f"a_{uuid.uuid4()}.png"},  # Adjust as needed
                                     files=files,
                                     )
            # response = self.client.post("http://localhost:8000/api/upload/",
            #                             data={"title": "a.png"},  # Adjust as needed
            #                             files=files,
            #                             )
            print(response.text)
            # Print response or check status for debugging
            if response.status_code == 201:
                print("File uploaded successfully.")
            else:
                print(f"File upload failed with status code {response.status_code}: {response.text}")

    @task
    def upload_to_mongodb(self):
        """Uploads a file to the mongodb"""
        f = r"/home/knn/Desktop/3857.tif"
        client = MongoClient(f"mongodb://{os.environ.get('MONGODB', 'localhost')}:27017/")
        fs = GridFS(client['geotiff'])

        try:
            fname = f.split("/")[-1]
            existing_file = fs.find_one({"filename": fname})

            if existing_file:
                print("=" * 20, "File already exists", "=" * 20)
                fid = existing_file._id
                fs.delete(existing_file._id)
                print("="*100, "File deleted", "="*100)
                with open(f, "rb") as f_:
                    fid = fs.put(f_, filename=fname)


        except Exception as err:
            print(err)
            fs.delete(fid)
            return "internal server error", 500

        # TODO: Delete temp files
        # TODO: Delete downloaded files
        # TODO: Delete netcdf files
        # TODO: Delete png files
