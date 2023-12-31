import os
import glob
import time
import uuid
import requests
import satpy
from satpy.utils import check_satpy
import rioxarray
import datetime

os.environ['XRIT_DECOMPRESS_PATH'] = '/opt/conda/pkgs/public-decomp-wt-2.8.1-h3fd9d12_1/bin/xRITDecompress'


# os.environ['XRIT_DECOMPRESS_PATH'] = '/usr/local/bin/xRITDecompress'


class DataConverter(object):
    def __init__(self, date_tag, mission, id, file_list):
        self.date_tag = date_tag
        self.mission = mission
        self.data = id
        self.filenames = file_list
        self.scn = None
        self.aoi = None
        self.expiration_date = 300  # 5 minutes
        self.nc_filename_hrv = None
        self.nc_filename_vis = None
        self.file_payload = {
            "data": self.data,
            "file_name": None,
            "file_date": self.date_tag,
            "file_path": None,
            "file_size": None,
            "file_type": None,
            "file_status": None,
            "is_active": True,
        }

        self.prefix = r'/media/knn/New Volume/Test_Data/'
        self.TEMP_DIR = r'/home/knn/Desktop/d_f_m/data_retrieval/file_downloader/temp/'
        # self.prefix = r'/app/downloaded_files/'
        # self.TEMP_DIR = r'/app/temp/'
        self.TOKEN = os.environ.get('TOKEN')
        self.readers = {'MSG': 'seviri_l1b_hrit',
                        'IODC': 'seviri_l1b_hrit'}
        self._reader = None
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
                                  'WV_073']
    @staticmethod
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

    def reader(self):
        self._reader = self.readers[self.mission]

    def check_imports(self):
        check_satpy(readers=['seviri_l1b_hrit'],
                    writers=['geotiff', 'cf', 'simple_image'],
                    extras=['cartopy', 'geoviews'])

    def apply_aoi(self):
        """Applies area of interest to the data"""
        pass

    def convert(self):
        self.reader()
        self.read_data()
        if self.check_bands():
            if self._convert_netcdf():
                self.upload_to_mongodb()
            if self._convert_png():
                self.upload_to_mongodb()
            if self._convert_tiff():
                self.upload_to_mongodb()

    def remove_files(self):
        """Removes all files from the temp directory"""
        pass
    @custom_printer
    def upload_to_mongodb(self):
        # TODO: Upload to mongodb
        # TODO: Delete temp files
        # TODO: Delete downloaded files
        # TODO: Delete netcdf files
        # TODO: Delete png files

        time.sleep(5)

    def read_data(self):

        files_updated = [os.path.join(self.prefix, f[1:]) for f in self.filenames]

        self.scn = satpy.Scene(reader=self._reader, filenames=files_updated)

        self.scn.load(self.seviri_data_names)

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

    def update_file_status(self):
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

    @custom_printer
    def _convert_netcdf(self):
        """Converts netcdf data to netcdf"""
        hrv_datasets = ['HRV']
        vis_datasets = [r for r in self.seviri_data_names if r != 'HRV']

        self.nc_filename_hrv = os.path.join(self.TEMP_DIR, f'{self.mission}_{self.date_tag}_hrv.nc')
        self.nc_filename_vis = os.path.join(self.TEMP_DIR, f'{self.mission}_{self.date_tag}_vis.nc')

        self.scn.save_datasets(writer='cf', datasets=hrv_datasets, filename=self.nc_filename_hrv)
        self.scn.save_datasets(writer='cf', datasets=vis_datasets, filename=self.nc_filename_vis)

        self.update_payload(file_name=f'{self.mission}_{self.date_tag}_hrv.nc',
                            file_path=self.nc_filename_hrv,
                            file_type='netcdf',
                            file_size=os.path.getsize(self.nc_filename_hrv),
                            file_status='converted')

        self.update_file_status()

        self.update_payload(file_name=f'{self.mission}_{self.date_tag}_vis.nc',
                            file_path=self.nc_filename_vis,
                            file_type='netcdf',
                            file_size=os.path.getsize(self.nc_filename_vis),
                            file_status='converted')
        return self.update_file_status()

    @custom_printer
    def _convert_png(self):
        from satpy.composites import GenericCompositor
        # compositor = GenericCompositor("overview")
        # compositor = GenericCompositor(['IR_108', 'IR_087', 'IR_120'])
        # rgb_composite = satpy.composits.GenericCompositor(['IR_108', 'IR_087', 'IR_120'])
        tag = f'{self.mission}_{self.date_tag}'
        self.scn.save_datasets(writer='simple_image', filename=os.path.join(self.TEMP_DIR, tag + '_{name}.png'))

        for png in glob.glob(os.path.join(self.TEMP_DIR, tag + '_*.png')):
            self.update_payload(file_name=f'{png.split("/")[-1]}',
                                file_path=png,
                                file_type='png',
                                file_size=os.path.getsize(png),
                                file_status='converted')
            self.update_file_status()

        self._create_overiew()
        return True

    @custom_printer
    def _create_overiew(self):
        """ Create an overview image of the data"""
        pass

    @custom_printer
    def _convert_tiff(self):
        """Converts data to geotiff"""

        # VIS
        rds_vis = rioxarray.open_rasterio(self.nc_filename_vis)
        rds_hrv = rioxarray.open_rasterio(self.nc_filename_hrv)
        for ch in [r for r in self.seviri_data_names]:
            f_name = f"{self.mission}_{self.date_tag}_{ch}.tif"
            f_path = os.path.join(self.TEMP_DIR, f"{f_name}")
            if ch == 'HRV':
                rds_hrv[ch].rio.to_raster(f_path)
            else:
                rds_vis[ch].rio.to_raster(f_path)
            self.update_payload(file_name=f_name, file_path=f_path, file_type='geo_tiff',
                                file_size=os.path.getsize(f_path),
                                file_status='converted')
            self.update_file_status()
        del rds_hrv, rds_vis
        return True
