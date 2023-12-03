import xarray as xr
import numpy as np
import matplotlib.pyplot as plt
import rasterio as rio
import rioxarray

nc_filename = 'seviri_test_visible.nc'

channel_name = 'VIS006'
ds = xr.open_dataset(nc_filename)
img_data = ds[channel_name].values
img_data = (img_data - np.min(img_data)) / (np.max(img_data) - np.min(img_data))  # Normalize to [0,

rds = rioxarray.open_rasterio(
    "seviri_test_visible.nc",
)
rds
rds['VIS006'].rio.to_raster('VIS006.tif')