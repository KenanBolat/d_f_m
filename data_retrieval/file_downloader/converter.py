import os
import glob

import numpy as np
import pandas as pd
import xarray as xr
import matplotlib.pyplot as plt
import satpy
import rasterio
from satpy.utils import check_satpy
import rasterio
import rioxarray

os.environ['XRIT_DECOMPRESS_PATH'] = '/opt/conda/pkgs/public-decomp-wt-2.8.1-h3fd9d12_1/bin/xRITDecompress'
# os.environ['XRIT_DECOMPRESS_PATH'] = '/usr/local/bin/xRITDecompress'
os.environ['TOKEN'] = '4d08fb583941ba6a6c3e91ba597487cf149b2d45'


class DataConverter(object):
    def __init__(self, date_tag, mission, event_id, file_list):
        self.date_tag = date_tag
        self.mission = mission
        self.event_id = event_id
        self.filenames = file_list
        self.scn = None
        self.aoi = None
        self.expiration_date = 300  # 5 minutes
        self.nc_filename_hrv = None
        self.nc_filename_vis = None
        # self.prefix = r'/home/knn/Desktop/d_f_m/data_retrieval/file_downloader/downloaded_files/'
        self.prefix = r'/media/knn/New Volume/Test_Data/'
        self.TEMP_DIR = r'/home/knn/Desktop/d_f_m/data_retrieval/file_downloader/temp/'
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

        if self._convert_netcdf():
            self.upload_to_mongodb()

        if self._convert_png():
            self.upload_to_mongodb()

        if self._convert_tiff():
            self.upload_to_mongodb()

    def remove_files(self):
        """Removes all files from the temp directory"""
        pass

    def upload_to_mongodb(self):
        # TODO: Upload to mongodb
        # TODO: Delete temp files
        # TODO: Delete downloaded files
        # TODO: Delete netcdf files
        # TODO: Delete png files
        #
        pass

    def read_data(self):

        files_updated = [os.path.join(self.prefix, f[1:]) for f in self.filenames]

        self.scn = satpy.Scene(reader=self._reader, filenames=files_updated)

        self.scn.load(self.seviri_data_names)
        if self.check_bands():
            self._convert_netcdf()

    def check_bands(self):
        channels = [r for r in self.scn.available_dataset_names() if r not in self.seviri_data_names]
        if len(channels) > 0:
            msg = f'There is a problem in reading : {channels}'
            print(msg)
            raise ValueError(msg)
        else:
            return True

    def _convert_netcdf(self):
        """Converts netcdf data to netcdf"""
        vis_datasets = [r for r in self.seviri_data_names if r is not 'HRV']
        hrv_datasets = [r for r in self.seviri_data_names if r is 'HRV']
        self.nc_filename_hrv = os.path.join(self.TEMP_DIR, f'{self.mission}_{self.date_tag}_hrv.nc')
        self.nc_filename_vis = os.path.join(self.TEMP_DIR, f'{self.mission}_{self.date_tag}_vis.nc')
        self.scn.save_datasets(writer='cf', datasets=hrv_datasets, filename=self.nc_filename_hrv)
        self.scn.save_datasets(writer='cf', datasets=vis_datasets, filename=self.nc_filename_vis)

    def _convert_png(self):
        from satpy.composites import GenericCompositor
        # compositor = GenericCompositor("overview")
        # compositor = GenericCompositor(['IR_108', 'IR_087', 'IR_120'])
        # rgb_composite = satpy.composits.GenericCompositor(['IR_108', 'IR_087', 'IR_120'])
        tag = f'{self.mission}_{self.date_tag}'
        self.scn.save_datasets(writer='simple_image', filename=os.path.join(self.TEMP_DIR, tag + '_{name}.png'))
        self._create_overiew()

    def _create_overiew(self):
        """ Create an overview image of the data"""
        pass

    def _convert_tiff(self):
        """Converts data to geotiff"""
        rds = rioxarray.open_rasterio(self.nc_filename_vis)
        for ch in [r for r in self.seviri_data_names if r is not 'HRV']:
            rds[ch].rio.to_raster(os.path.join(self.TEMP_DIR, f"{self.mission}_{self.date_tag}_{ch}.tif"))
        del rds
        rds = rioxarray.open_rasterio(self.nc_filename_hrv)
        for ch in ['HRV']:
            rds[ch].rio.to_raster(os.path.join(self.TEMP_DIR, f"{self.mission}_{self.date_tag}_{ch}.tif"))


if __name__ == '__main__':
    filenames = ["/MSG/202308140645/HRV______/H-000-MSG3__-MSG3________-HRV______-000001___-202308140645-__",
                 "/MSG/202308140645/HRV______/H-000-MSG3__-MSG3________-HRV______-000002___-202308140645-__",
                 "/MSG/202308140645/HRV______/H-000-MSG3__-MSG3________-HRV______-000003___-202308140645-__",
                 "/MSG/202308140645/HRV______/H-000-MSG3__-MSG3________-HRV______-000004___-202308140645-__",
                 "/MSG/202308140645/HRV______/H-000-MSG3__-MSG3________-HRV______-000005___-202308140645-__",
                 "/MSG/202308140645/HRV______/H-000-MSG3__-MSG3________-HRV______-000006___-202308140645-__",
                 "/MSG/202308140645/HRV______/H-000-MSG3__-MSG3________-HRV______-000007___-202308140645-__",
                 "/MSG/202308140645/HRV______/H-000-MSG3__-MSG3________-HRV______-000008___-202308140645-__",
                 "/MSG/202308140645/HRV______/H-000-MSG3__-MSG3________-HRV______-000009___-202308140645-__",
                 "/MSG/202308140645/HRV______/H-000-MSG3__-MSG3________-HRV______-000010___-202308140645-__",
                 "/MSG/202308140645/HRV______/H-000-MSG3__-MSG3________-HRV______-000011___-202308140645-__",
                 "/MSG/202308140645/HRV______/H-000-MSG3__-MSG3________-HRV______-000012___-202308140645-__",
                 "/MSG/202308140645/HRV______/H-000-MSG3__-MSG3________-HRV______-000013___-202308140645-__",
                 "/MSG/202308140645/HRV______/H-000-MSG3__-MSG3________-HRV______-000014___-202308140645-__",
                 "/MSG/202308140645/HRV______/H-000-MSG3__-MSG3________-HRV______-000015___-202308140645-__",
                 "/MSG/202308140645/HRV______/H-000-MSG3__-MSG3________-HRV______-000016___-202308140645-__",
                 "/MSG/202308140645/HRV______/H-000-MSG3__-MSG3________-HRV______-000017___-202308140645-__",
                 "/MSG/202308140645/HRV______/H-000-MSG3__-MSG3________-HRV______-000018___-202308140645-__",
                 "/MSG/202308140645/HRV______/H-000-MSG3__-MSG3________-HRV______-000019___-202308140645-__",
                 "/MSG/202308140645/HRV______/H-000-MSG3__-MSG3________-HRV______-000020___-202308140645-__",
                 "/MSG/202308140645/HRV______/H-000-MSG3__-MSG3________-HRV______-000021___-202308140645-__",
                 "/MSG/202308140645/HRV______/H-000-MSG3__-MSG3________-HRV______-000022___-202308140645-__",
                 "/MSG/202308140645/HRV______/H-000-MSG3__-MSG3________-HRV______-000023___-202308140645-__",
                 "/MSG/202308140645/HRV______/H-000-MSG3__-MSG3________-HRV______-000024___-202308140645-__",
                 "/MSG/202308140645/IR_016___/H-000-MSG3__-MSG3________-IR_016___-000001___-202308140645-__",
                 "/MSG/202308140645/IR_016___/H-000-MSG3__-MSG3________-IR_016___-000002___-202308140645-__",
                 "/MSG/202308140645/IR_016___/H-000-MSG3__-MSG3________-IR_016___-000003___-202308140645-__",
                 "/MSG/202308140645/IR_016___/H-000-MSG3__-MSG3________-IR_016___-000004___-202308140645-__",
                 "/MSG/202308140645/IR_016___/H-000-MSG3__-MSG3________-IR_016___-000005___-202308140645-__",
                 "/MSG/202308140645/IR_016___/H-000-MSG3__-MSG3________-IR_016___-000006___-202308140645-__",
                 "/MSG/202308140645/IR_016___/H-000-MSG3__-MSG3________-IR_016___-000007___-202308140645-__",
                 "/MSG/202308140645/IR_016___/H-000-MSG3__-MSG3________-IR_016___-000008___-202308140645-__",
                 "/MSG/202308140645/IR_039___/H-000-MSG3__-MSG3________-IR_039___-000001___-202308140645-__",
                 "/MSG/202308140645/IR_039___/H-000-MSG3__-MSG3________-IR_039___-000002___-202308140645-__",
                 "/MSG/202308140645/IR_039___/H-000-MSG3__-MSG3________-IR_039___-000003___-202308140645-__",
                 "/MSG/202308140645/IR_039___/H-000-MSG3__-MSG3________-IR_039___-000004___-202308140645-__",
                 "/MSG/202308140645/IR_039___/H-000-MSG3__-MSG3________-IR_039___-000005___-202308140645-__",
                 "/MSG/202308140645/IR_039___/H-000-MSG3__-MSG3________-IR_039___-000006___-202308140645-__",
                 "/MSG/202308140645/IR_039___/H-000-MSG3__-MSG3________-IR_039___-000007___-202308140645-__",
                 "/MSG/202308140645/IR_039___/H-000-MSG3__-MSG3________-IR_039___-000008___-202308140645-__",
                 "/MSG/202308140645/IR_087___/H-000-MSG3__-MSG3________-IR_087___-000001___-202308140645-__",
                 "/MSG/202308140645/IR_087___/H-000-MSG3__-MSG3________-IR_087___-000002___-202308140645-__",
                 "/MSG/202308140645/IR_087___/H-000-MSG3__-MSG3________-IR_087___-000003___-202308140645-__",
                 "/MSG/202308140645/IR_087___/H-000-MSG3__-MSG3________-IR_087___-000004___-202308140645-__",
                 "/MSG/202308140645/IR_087___/H-000-MSG3__-MSG3________-IR_087___-000005___-202308140645-__",
                 "/MSG/202308140645/IR_087___/H-000-MSG3__-MSG3________-IR_087___-000006___-202308140645-__",
                 "/MSG/202308140645/IR_087___/H-000-MSG3__-MSG3________-IR_087___-000007___-202308140645-__",
                 "/MSG/202308140645/IR_087___/H-000-MSG3__-MSG3________-IR_087___-000008___-202308140645-__",
                 "/MSG/202308140645/IR_097___/H-000-MSG3__-MSG3________-IR_097___-000001___-202308140645-__",
                 "/MSG/202308140645/IR_097___/H-000-MSG3__-MSG3________-IR_097___-000002___-202308140645-__",
                 "/MSG/202308140645/IR_097___/H-000-MSG3__-MSG3________-IR_097___-000003___-202308140645-__",
                 "/MSG/202308140645/IR_097___/H-000-MSG3__-MSG3________-IR_097___-000004___-202308140645-__",
                 "/MSG/202308140645/IR_097___/H-000-MSG3__-MSG3________-IR_097___-000005___-202308140645-__",
                 "/MSG/202308140645/IR_097___/H-000-MSG3__-MSG3________-IR_097___-000006___-202308140645-__",
                 "/MSG/202308140645/IR_097___/H-000-MSG3__-MSG3________-IR_097___-000007___-202308140645-__",
                 "/MSG/202308140645/IR_097___/H-000-MSG3__-MSG3________-IR_097___-000008___-202308140645-__",
                 "/MSG/202308140645/IR_108___/H-000-MSG3__-MSG3________-IR_108___-000001___-202308140645-__",
                 "/MSG/202308140645/IR_108___/H-000-MSG3__-MSG3________-IR_108___-000002___-202308140645-__",
                 "/MSG/202308140645/IR_108___/H-000-MSG3__-MSG3________-IR_108___-000003___-202308140645-__",
                 "/MSG/202308140645/IR_108___/H-000-MSG3__-MSG3________-IR_108___-000004___-202308140645-__",
                 "/MSG/202308140645/IR_108___/H-000-MSG3__-MSG3________-IR_108___-000005___-202308140645-__",
                 "/MSG/202308140645/IR_108___/H-000-MSG3__-MSG3________-IR_108___-000006___-202308140645-__",
                 "/MSG/202308140645/IR_108___/H-000-MSG3__-MSG3________-IR_108___-000007___-202308140645-__",
                 "/MSG/202308140645/IR_108___/H-000-MSG3__-MSG3________-IR_108___-000008___-202308140645-__",
                 "/MSG/202308140645/IR_120___/H-000-MSG3__-MSG3________-IR_120___-000001___-202308140645-__",
                 "/MSG/202308140645/IR_120___/H-000-MSG3__-MSG3________-IR_120___-000002___-202308140645-__",
                 "/MSG/202308140645/IR_120___/H-000-MSG3__-MSG3________-IR_120___-000003___-202308140645-__",
                 "/MSG/202308140645/IR_120___/H-000-MSG3__-MSG3________-IR_120___-000004___-202308140645-__",
                 "/MSG/202308140645/IR_120___/H-000-MSG3__-MSG3________-IR_120___-000005___-202308140645-__",
                 "/MSG/202308140645/IR_120___/H-000-MSG3__-MSG3________-IR_120___-000006___-202308140645-__",
                 "/MSG/202308140645/IR_120___/H-000-MSG3__-MSG3________-IR_120___-000007___-202308140645-__",
                 "/MSG/202308140645/IR_120___/H-000-MSG3__-MSG3________-IR_120___-000008___-202308140645-__",
                 "/MSG/202308140645/IR_134___/H-000-MSG3__-MSG3________-IR_134___-000001___-202308140645-__",
                 "/MSG/202308140645/IR_134___/H-000-MSG3__-MSG3________-IR_134___-000002___-202308140645-__",
                 "/MSG/202308140645/IR_134___/H-000-MSG3__-MSG3________-IR_134___-000003___-202308140645-__",
                 "/MSG/202308140645/IR_134___/H-000-MSG3__-MSG3________-IR_134___-000004___-202308140645-__",
                 "/MSG/202308140645/IR_134___/H-000-MSG3__-MSG3________-IR_134___-000005___-202308140645-__",
                 "/MSG/202308140645/IR_134___/H-000-MSG3__-MSG3________-IR_134___-000006___-202308140645-__",
                 "/MSG/202308140645/IR_134___/H-000-MSG3__-MSG3________-IR_134___-000007___-202308140645-__",
                 "/MSG/202308140645/IR_134___/H-000-MSG3__-MSG3________-IR_134___-000008___-202308140645-__",
                 "/MSG/202308140645/VIS006___/H-000-MSG3__-MSG3________-VIS006___-000001___-202308140645-__",
                 "/MSG/202308140645/VIS006___/H-000-MSG3__-MSG3________-VIS006___-000002___-202308140645-__",
                 "/MSG/202308140645/VIS006___/H-000-MSG3__-MSG3________-VIS006___-000003___-202308140645-__",
                 "/MSG/202308140645/VIS006___/H-000-MSG3__-MSG3________-VIS006___-000004___-202308140645-__",
                 "/MSG/202308140645/VIS006___/H-000-MSG3__-MSG3________-VIS006___-000005___-202308140645-__",
                 "/MSG/202308140645/VIS006___/H-000-MSG3__-MSG3________-VIS006___-000006___-202308140645-__",
                 "/MSG/202308140645/VIS006___/H-000-MSG3__-MSG3________-VIS006___-000007___-202308140645-__",
                 "/MSG/202308140645/VIS006___/H-000-MSG3__-MSG3________-VIS006___-000008___-202308140645-__",
                 "/MSG/202308140645/VIS008___/H-000-MSG3__-MSG3________-VIS008___-000001___-202308140645-__",
                 "/MSG/202308140645/VIS008___/H-000-MSG3__-MSG3________-VIS008___-000002___-202308140645-__",
                 "/MSG/202308140645/VIS008___/H-000-MSG3__-MSG3________-VIS008___-000003___-202308140645-__",
                 "/MSG/202308140645/VIS008___/H-000-MSG3__-MSG3________-VIS008___-000004___-202308140645-__",
                 "/MSG/202308140645/VIS008___/H-000-MSG3__-MSG3________-VIS008___-000005___-202308140645-__",
                 "/MSG/202308140645/VIS008___/H-000-MSG3__-MSG3________-VIS008___-000006___-202308140645-__",
                 "/MSG/202308140645/VIS008___/H-000-MSG3__-MSG3________-VIS008___-000007___-202308140645-__",
                 "/MSG/202308140645/VIS008___/H-000-MSG3__-MSG3________-VIS008___-000008___-202308140645-__",
                 "/MSG/202308140645/WV_062___/H-000-MSG3__-MSG3________-WV_062___-000001___-202308140645-__",
                 "/MSG/202308140645/WV_062___/H-000-MSG3__-MSG3________-WV_062___-000002___-202308140645-__",
                 "/MSG/202308140645/WV_062___/H-000-MSG3__-MSG3________-WV_062___-000003___-202308140645-__",
                 "/MSG/202308140645/WV_062___/H-000-MSG3__-MSG3________-WV_062___-000004___-202308140645-__",
                 "/MSG/202308140645/WV_062___/H-000-MSG3__-MSG3________-WV_062___-000005___-202308140645-__",
                 "/MSG/202308140645/WV_062___/H-000-MSG3__-MSG3________-WV_062___-000006___-202308140645-__",
                 "/MSG/202308140645/WV_062___/H-000-MSG3__-MSG3________-WV_062___-000007___-202308140645-__",
                 "/MSG/202308140645/WV_062___/H-000-MSG3__-MSG3________-WV_062___-000008___-202308140645-__",
                 "/MSG/202308140645/WV_073___/H-000-MSG3__-MSG3________-WV_073___-000001___-202308140645-__",
                 "/MSG/202308140645/WV_073___/H-000-MSG3__-MSG3________-WV_073___-000002___-202308140645-__",
                 "/MSG/202308140645/WV_073___/H-000-MSG3__-MSG3________-WV_073___-000003___-202308140645-__",
                 "/MSG/202308140645/WV_073___/H-000-MSG3__-MSG3________-WV_073___-000004___-202308140645-__",
                 "/MSG/202308140645/WV_073___/H-000-MSG3__-MSG3________-WV_073___-000005___-202308140645-__",
                 "/MSG/202308140645/WV_073___/H-000-MSG3__-MSG3________-WV_073___-000006___-202308140645-__",
                 "/MSG/202308140645/WV_073___/H-000-MSG3__-MSG3________-WV_073___-000007___-202308140645-__",
                 "/MSG/202308140645/WV_073___/H-000-MSG3__-MSG3________-WV_073___-000008___-202308140645-__",
                 "/MSG/202308140645/_________/H-000-MSG3__-MSG3________-_________-EPI______-202308140645-__",
                 "/MSG/202308140645/_________/H-000-MSG3__-MSG3________-_________-PRO______-202308140645-__"]

    d = DataConverter('202308140845', 'MSG', '0fbfb057-bc61-48ef-b9ff-e4c2d8ef8bd0', file_list=filenames)
    d.check_imports()
    d.read_data()
    d._convert_netcdf()
