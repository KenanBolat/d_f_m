import os
import glob

import numpy as np
import pandas as pd
import xarray as xr
import matplotlib.pyplot as plt
import satpy
import rasterio
from satpy.utils import check_satpy

os.environ['XRIT_DECOMPRESS_PATH'] = '/opt/conda/pkgs/public-decomp-wt-2.8.1-h3fd9d12_1/bin/xRITDecompress'
# os.environ['XRIT_DECOMPRESS_PATH'] = '/usr/local/bin/xRITDecompress'


class DataConverter(object):
    def __init__(self, data, data_type):
        self.data = data
        self.data_type = data_type
        self.scn = None

    def check_imports(self):
        check_satpy(readers=['seviri_l1b_hrit'],
                    writers=['geotiff', 'cf', 'simple_image'],
                    extras=['cartopy', 'geoviews'])

    def convert(self):
        if self.data_type == 'netcdf':
            return self._convert_netcdf()
        elif self.data_type == 'png':
            return self._convert_png()
        elif self.data_type == 'xml':
            return self._convert_geotiff()
        elif self.data_type == 'hdf':
            return self._convert_hdf()
        else:
            raise ValueError('Invalid data type: {}'.format(self.data_type))

    def read_data(self):
        channel_folders = ['IR_087___', 'VIS008___', '_________', 'WV_073___', 'IR_016___', 'VIS006___', 'HRV______',
                           'IR_120___', 'IR_097___', 'IR_108___', 'IR_039___', 'IR_134___', 'WV_062___']
        data_folder = r"/media/knn/New Volume/Test_Data/IODC/202308140600"
        date_flag = "202308140600"
        filenames = []
        for f_ in channel_folders:
            for row in glob.glob1(os.path.join(data_folder, f_), f'H-000-MSG2*{date_flag}*'):
                # print(row)
                filenames.append(os.path.join(data_folder, f_, row))

        self.scn.load(['VIS006', 'VIS008', 'IR_016', 'IR_039', 'IR_087', 'IR_097', 'IR_108', 'IR_120', 'IR_134',
                       'WV_062', 'WV_073', 'HRV'])
        pass

    def _convert_netcdf(self):
        """Converts netcdf data to netcdf"""
        # return json.loads(self.data)
        pass

    def _convert_csv(self):
        """Converts csv data to netcdf"""
        pass

    def _convert_xml(self):
        """Converts xml data to netcdf"""
        pass

if __name__ == '__main__':
    d = DataConverter('data', 'netcdf')
    d.check_imports()
    d._convert_netcdf()
