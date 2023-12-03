# host => <Geoserver IP Address>
from geo.Geoserver import Geoserver
host='geoserver'
geo = Geoserver(f'http://{host}:8080/geoserver', username='admin', password='geoserver')

workspace='demo4'
try:
    geo.get_workspace(workspace=workspace)
    geo.create_workspace(workspace=workspace)
except:
    print('does not exist')




c_ramp = {'label 1 value': '#ffff55', 'label 2 value': '#505050', 'label 3 value': '#404040', 'label 4 value': '#333333' }


layer_name = 'demo_layer'
product_tag = '20230814_060000'
raster_path = f'/opt/gdal_data/HRV_{product_tag}.tif'

geo.create_coveragestore(layer_name=layer_name, path=raster_path, workspace=workspace)
geo.create_coveragestyle(raster_path=raster_path, workspace=workspace, color_ramp=c_ramp, cmap_type='values')
# geo.publish_style(layer_name=layer_name, style_name=f'HRV_{product_tag}.tif', workspace=workspace)
# geo.create_coveragestyle(raster_path=raster_path, style_name='style_1', workspace='demo', color_ramp='RdYiGn', cmap_type='values')
