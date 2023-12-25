import os
import glob

import numpy as np
import pandas as pd
import xarray as xr
import matplotlib.pyplot as plt
import satpy
import rasterio
from satpy.utils import check_satpy


class DataConverter(object):
    def __init__(self, data, data_type):
        self.data = data
        self.data_type = data_type

    def check_imports(self):
        check_satpy(readers=['seviri_l1b_hrit'],
                    writers=['geotiff', 'cf', 'simple_image'],
                    extras=['cartopy', 'geoviews'])
        pass


if __name__ == '__main__':
    data = DataConverter('test', 'netcdf')
    data.check_imports()
