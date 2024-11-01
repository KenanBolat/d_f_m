from osgeo import gdal
import glob
import os


TEMP_DIR = r'/home/knn/Desktop/temp'
mission = 'MSG'
date_tag = '202308140600'
tag = f'{mission}_{date_tag}'

kwargs_warp = {
    'srcSRS': 'EPSG:4326',
    'dstSRS': 'EPSG:3857',
}
kwargs_translate = {
    'format': 'PNG',
    'outputType': gdal.GDT_Byte,
}

for tiff in list(set(glob.glob(os.path.join(TEMP_DIR, tag + '_*aoi.tif'))) - set(
        glob.glob(os.path.join(TEMP_DIR, tag + '_*3857.tif')))):
    print(f"{tiff} is being converted")

    # add a flag for the name of the geotiff re-projected to 3857
    projected_tif_name = tiff.replace('.tif', '_3857.tif')

    # re-project
    gdal.Warp(projected_tif_name, tiff, **kwargs_warp)

    # png name of the geotiff re-projected to 3857
    projected_png_name = tiff.replace('.tif', '.png')

    # export png
    gdal.Translate(projected_png_name, projected_tif_name, **kwargs_translate)


