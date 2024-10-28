import os
import glob
import time
import uuid
import requests
import satpy
from satpy.utils import check_satpy
import rioxarray
import datetime
import hashlib
import gridfs
import json
from pymongo import MongoClient
from gridfs import GridFS

from pyresample import create_area_def

from bson.objectid import ObjectId
from dataconverter.communication.message_broker_if import RabbitMQInterface as rabbitmq

os.environ['XRIT_DECOMPRESS_PATH'] = '/usr/local/bin/xRITDecompress'


def custom_printer(func):
    """Prints the time of the process"""
    uniq_id = uuid.uuid4()

    def inner(*args, **kwargs):
        print(f"[{datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] [{uniq_id}] [Process has been initiated]")

        # getting the returned value
        returned_value = func(*args, **kwargs)
        print(f"[{datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] [{uniq_id}] [Process has been finished]")

        # returning the value to the original frame
        return returned_value

    return inner


class DataConverter:
    def __init__(self, date_tag, mission, id, file_list):
        self.uniq_id = uuid.uuid4()
        self.date_tag = date_tag
        self.mission = mission
        self.data = id
        self.filenames = file_list
        self.scn = None
        self.aoi = None
        self.expiration_date = 300  # 5 minutes
        self.nc_filename_hrv = None
        self.nc_filename_vis = None
        self._rabbit = rabbitmq(os.environ.get('RABBITMQ_HOST', 'localhost'), 5672, 'guest', 'guest', 'data')

        self.file_payload = {
            "data": self.data,
            "file_name": None,
            "file_date": self.date_tag,
            "file_path": None,
            "file_size": None,
            "file_type": None,
            "file_status": None,
            "is_active": True,
            "mongo_id": None,
        }

        # self.prefix = r'/media/knn/New Volume/Test_Data/'
        # self.TEMP_DIR = os.path.join(r'/home/knn/d_f_m/data_retrieval/file_downloader/temp/', str(self.uniq_id))
        self.prefix = r'/app/downloaded_files/'
        self.TEMP_DIR = os.path.join(r'/app/temp/', str(self.uniq_id))
        self.readers = {'MSG': 'seviri_l1b_hrit',
                        'IODC': 'seviri_l1b_hrit',
                        'RSS': 'seviri_l1b_hrit',
                        }
        self._reader = None
        self.TOKEN = os.environ.get('TOKEN')
        self.seviri_data_names = ['HRV',
                                  'IR_016',
                                  'IR_039',
                                  'IR_087',
                                  'IR_097',
                                  'IR_108',
                                  'IR_120',
                                  'IR_134',
                                  'VIS006',
                                  'VIS008',
                                  'WV_062',
                                  'WV_073',
                                  'natural_color',
                                  'ir_cloud_day',
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

    def connect(self):
        self._channel = self._rabbit.connect()

    def reader(self):
        self._reader = self.readers[self.mission]

    def check_imports(self):
        check_satpy(readers=['seviri_l1b_hrit'],
                    writers=['geotiff', 'cf', 'simple_image'],
                    extras=['cartopy', 'geoviews'])

    def apply_aoi(self):
        """Applies area of interest to the data"""
        pass

    def check_folder(self):
        if not os.path.exists(self.TEMP_DIR):
            os.makedirs(self.TEMP_DIR)

    def convert(self):
        self.check_folder()
        self.reader()
        self.read_data()
        if self.check_bands():
            self._convert_netcdf(upload_flag=False)
            self._convert_png()
            self._convert_tiff(upload_flag=False)
            self._convert_tiff_aoi()
            self._convert_png_aoi()

    def remove_files(self):
        """Removes all files from the temp directory"""

        files = glob.glob(f'{self.TEMP_DIR}/*')
        for file_ in files:
            print('removing file:', file_)
            os.remove(file_)
            print('file removed:', file_)
        print('All files removed')

    @staticmethod
    def calculate_hash(content):
        md5 = hashlib.md5()
        md5.update(content)
        return md5.hexdigest()

    @custom_printer
    def upload_to_mongodb(self, f, ftype="netcdf"):
        """Uploads a file to the mongodb"""
        client = MongoClient(f"mongodb://{os.environ.get('MONGODB', 'localhost')}:27017/")

        if ftype == "netcdf":
            fs = GridFS(client['netcdf'])
        elif ftype == "png":
            fs = GridFS(client['png'])
        elif ftype == "geotiff":
            fs = GridFS(client['geotiff'])
        else:
            return "internal server error", 500

        try:
            fname = f.split("/")[-1]
            existing_file = fs.find_one({"filename": fname})

            if existing_file:
                print("=" * 100, "File already exists", "=" * 100)
                fid = existing_file._id
                # fs.delete(existing_file._id)
                # print("="*100, "File deleted", "="*100)
            else:
                with open(f, "rb") as f_:
                    fid = fs.put(f_, filename=fname)
            self.connect()
            payload = {
                "queue_name": "data",
                "content": f"{self._rabbit.get_current_time()}",
                "service_name": "Data Converter",
                "producer_ip": f"{self._rabbit.get_ip()}",
                "status": "Uploaded ",
                "data_fid": str(fid),
                "nc_fid": None,
                "token": os.environ.get("TOKEN"),
            }
            self.update_payload(mongo_id=str(fid))
            self._rabbit.send(message=json.dumps(payload))

        except Exception as err:
            print(err)
            fs.delete(fid)
            return "internal server error", 500

        # TODO: Delete temp files
        # TODO: Delete downloaded files
        # TODO: Delete netcdf files
        # TODO: Delete png files

    def read_data(self):

        files_updated = [os.path.join(self.prefix, f[1:]) for f in self.filenames]

        self.scn = satpy.Scene(reader=self._reader, filenames=files_updated)
        print(self.seviri_data_names)
        self.scn.load(self.seviri_data_names)
        print("=" * 1500)

    def check_bands(self):
        channels = [r for r in self.scn.available_dataset_names() if r not in self.seviri_data_names]
        if len(channels) > 0:
            msg = f'There is a problem in reading : {channels}'
            print(msg)
            raise ValueError(msg)
        else:
            return True

    def update_payload(self, **kwargs):
        """Updates the file status"""
        for key, value in kwargs.items():
            self.file_payload[key] = value

    def check_file_exists(self, file_name_to_check):
        """Checks if the file is already uploaded"""
        headers = {'Content-Type': 'application/json'}
        response = requests.get(f"http://{os.environ.get('CORE_APP', 'localhost')}:8000/api/file/",
                                params=self.file_payload,
                                headers=headers)
        if response.status_code == 200:
            files = response.json()
            for file in files:
                if file['file_name'] == file_name_to_check:
                    return True
                    print(
                        f"{datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}:File {file_name_to_check} already uploaded")
                else:
                    False
        else:
            print(
                f"{datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}: File {file_name_to_check} "
                f"check failed {response.status_code} {response.json()}")
            return False

    def insert_file(self):
        """Updates the file status"""
        headers = {'Content-Type': 'application/json'}
        response = requests.post(f"http://{os.environ.get('CORE_APP', 'localhost')}:8000/api/file/",
                                 json=self.file_payload,
                                 headers=headers)
        if response.status_code == 201:
            print(
                f"{datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}:File {self.file_payload['file_name']} uploaded successfully")

            return True
        else:
            print(
                f"{datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}: File {self.file_payload['file_name']} upload failed {response.status_code} {response.json()}")
            return False

    def upload_file(self, file_name):
        """Updates the file status"""
        # headers = {'Content-Type': 'application/json'}

        with open(file_name, 'rb') as file_data:

            files = {
                'image': (file_name, file_data, 'image/png'),  # Adjust MIME type if not PNG
            }
            response = requests.post(f"http://{os.environ.get('CORE_APP', 'localhost')}:8000/api/upload/",
                                     data={'title':f'{file_name.split("/")[-1]}'},
                                     files=files,)
        if response.status_code == 201:
            print(
                f"{datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}:File uploaded successfully")

            return True
        else:
            print(
                f"{datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}: File upload failed {response.status_code} {response.json()}")
            return False

    @custom_printer
    def _convert_netcdf(self, upload_flag=True):
        """Converts netcdf data to netcdf"""
        hrv_datasets = ['HRV']
        vis_datasets = [r for r in self.seviri_data_names if r != 'HRV']

        self.nc_filename_hrv = os.path.join(self.TEMP_DIR, f'{self.mission}_{self.date_tag}_hrv.nc')
        self.nc_filename_vis = os.path.join(self.TEMP_DIR, f'{self.mission}_{self.date_tag}_vis.nc')

        if self.check_file_exists(self.nc_filename_hrv) or self.check_file_exists(self.nc_filename_vis):
            print("=" * 100, "File already exists", "=" * 100)
        else:
            self.scn.save_datasets(writer='cf', datasets=hrv_datasets, filename=self.nc_filename_hrv)
            self.scn.save_datasets(writer='cf', datasets=vis_datasets, filename=self.nc_filename_vis)

            file_status = 'To be Converted'

            if upload_flag == True:
                self.upload_to_mongodb(self.nc_filename_vis, ftype="netcdf")
                self.upload_to_mongodb(self.nc_filename_hrv, ftype="netcdf")
                file_status = 'converted and uploaded to mongodb'
            else:
                file_status = 'converted but not uploaded'

            self.update_payload(file_name=f'{self.mission}_{self.date_tag}_vis.nc',
                                file_path=self.nc_filename_vis,
                                file_type='netcdf',
                                file_size=os.path.getsize(self.nc_filename_vis),
                                file_status=file_status)
            self.insert_file()

            self.update_payload(file_name=f'{self.mission}_{self.date_tag}_hrv.nc',
                                file_path=self.nc_filename_hrv,
                                file_type='netcdf',
                                file_size=os.path.getsize(self.nc_filename_hrv),
                                file_status=file_status)

            return self.insert_file()

    @custom_printer
    def _convert_png(self):
        if self.check_file_exists(self.nc_filename_hrv) or self.check_file_exists(self.nc_filename_vis):
            print("=" * 100, "File already exists", "=" * 100)
        else:

            tag = f'{self.mission}_{self.date_tag}'
            self.scn.save_datasets(writer='simple_image', filename=os.path.join(self.TEMP_DIR, tag + '_{name}.png'))

            for png in glob.glob(os.path.join(self.TEMP_DIR, tag + '_*.png')):
                self.upload_to_mongodb(png, ftype="png")
                self.update_payload(file_name=f'{png.split("/")[-1]}',
                                    file_path=png,
                                    file_type='png',
                                    file_size=os.path.getsize(png),
                                    file_status='converted')
                self.insert_file()
                self.upload_file(png)

            self._create_overiew()
            return True

    @custom_printer
    def _convert_png_aoi(self):
        print("=" * 25, "Converting to AOI:png ", "=" * 25)

        if self.check_file_exists(self.nc_filename_hrv) or self.check_file_exists(self.nc_filename_vis):
            print("=" * 100, "File already exists", "=" * 100)
        else:

            tag = f'{self.mission}_{self.date_tag}'
            self.aoi.save_datasets(writer='simple_image', filename=os.path.join(self.TEMP_DIR, tag + '_{name}_aoi.png'))

            for png in glob.glob(os.path.join(self.TEMP_DIR, tag + '_*_aoi.png')):
                self.upload_to_mongodb(png, ftype="png")
                self.update_payload(file_name=f'{png.split("/")[-1]}',
                                    file_path=png,
                                    file_type='png',
                                    file_size=os.path.getsize(png),
                                    file_status='converted')
                self.insert_file()
                self.upload_file(file_name=png)

            self._create_overiew()
            return True

    @custom_printer
    def _create_overiew(self):
        """ Create an overview image of the data"""
        pass

    @custom_printer
    def _convert_tiff(self, upload_flag=True):
        """Converts data to geotiff"""

        rds_vis = rioxarray.open_rasterio(self.nc_filename_vis)
        rds_hrv = rioxarray.open_rasterio(self.nc_filename_hrv)
        for ch in [r for r in self.seviri_data_names]:
            f_name = f"{self.mission}_{self.date_tag}_{ch}.tif"
            f_path = os.path.join(self.TEMP_DIR, f"{f_name}")
            if self.check_file_exists(f_name):
                print("=" * 100, "File already exists", "=" * 100)
            else:

                if ch == 'HRV':
                    rds_hrv[ch].rio.to_raster(f_path)
                else:
                    rds_vis[ch].rio.to_raster(f_path)

                if upload_flag:
                    file_status = 'converted but not uploaded'
                    self.upload_to_mongodb(f_path, ftype="geotiff")

                else:
                    file_status = 'converted and uploaded to mongodb'

                self.update_payload(file_name=f_name, file_path=f_path, file_type='geotiff',
                                    file_size=os.path.getsize(f_path),
                                    file_status=file_status)
                self.insert_file()
        del rds_hrv, rds_vis
        return True

    @custom_printer
    def _convert_tiff_aoi(self):
        print("=" * 25, "Converting to AOI: tiff", "=" * 25)
        """Converts data to geotiff"""
        aoi = create_area_def('aoi', {'proj': 'longlat', 'datum': 'WGS84'},
                              # area_extent=[22, 30, 45, 45],
                              # area_extent=[16, 30, 52, 52],
                              area_extent=[10, 30, 52, 52],
                              resolution=0.01,
                              units='degrees',
                              description='Global 0.01x0.01 degree lat-lon grid')

        self.aoi = self.scn.resample(aoi)

        for ch in [r for r in self.seviri_data_names]:
            f_name = f"{self.mission}_{self.date_tag}_{ch}_aoi.tif"
            f_path = os.path.join(self.TEMP_DIR, f"{f_name}")

            if self.check_file_exists(f_name):
                print("=" * 100, "File already exists", "=" * 100)
            else:
                self.aoi.save_datasets(writer='geotiff', datasets=[ch], filename=f_path)
                self.update_payload(file_name=f_name, file_path=f_path, file_type='geotiff',
                                    file_size=os.path.getsize(f_path),
                                    file_status='converted')
                self.upload_to_mongodb(f_path, ftype="geotiff")
                self.insert_file()

        return True
