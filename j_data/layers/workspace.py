import requests
from requests.auth import HTTPBasicAuth
import os


class MetGeoserver:
    def __init__(self):
        self.geoserver_url = os.environ.get('GEOSERVER_URL', 'http://localhost:8080/geoserver/rest/')
        self.geoserver_user = os.environ.get('GEOSERVER_USER', 'admin')
        self.geoserver_password = os.environ.get('GEOSERVER_PASSWORD', 'geoserver')
        self.workspace_name = None
        self.store_name = None

    def create_workspace(self, workspace_name):
        data = f"""
        <workspace>
            <name>{workspace_name}</name>
        </workspace>
        """
        response = requests.post(
            f'{self.geoserver_url}/workspaces',
            headers={'Content-type': 'text/xml'},
            data=data,
            auth=HTTPBasicAuth(self.geoserver_user, self.geoserver_password)
        )
        response.raise_for_status()

    def create_store(self, store_name, geotiff_path):
        self.store_name = store_name
        headers = {'Content-type': 'text/xml'}

        data = f"""
        <coverageStore>
            <name>{self.store_name}</name>
            <workspace>{self.workspace}</workspace>
            <enabled>true</enabled>
            <type>GeoTIFF</type>
            <url>file:{geotiff_path}</url>
        </coverageStore>
        """

        response = requests.post(
            f'{self.geoserver_url}/workspaces/{self.workspace}/coveragestores',
            headers=headers,
            data=data,
            auth=HTTPBasicAuth(self.geoserver_user, self.geoserver_password)
        )
        response.raise_for_status()

    def publish_layer(self, layer_name):
        data = f"""
        <coverage>
            <name>{layer_name}</name>
            <nativeName>{layer_name}</nativeName>
            <namespace>
                <name>{self.workspace_name}</name>
            </namespace>
            <store>
                <name>{self.store_name}</name>
            </store>
        </coverage>
        """
        response = requests.post(
            f'{self.geoserver_url}/workspaces/{self.workspace}/coveragestores/{self.store_name}/coverages',
            headers={'Content-type': 'application/xml'},
            data=data,
            auth=HTTPBasicAuth(self.geoserver_user, self.geoserver_password)
        )
        response.raise_for_status()

    # Example usage


if __name__ == '__main__':
    geoserver = MetGeoserver()
    workspace_name = 'tmeteo'
    geoserver.create_workspace(workspace_name=workspace_name)

    geotiff_files = [
        {'file_path': '/home/knn/Desktop/d_f_m/j_data/geoserver_data/aoi/MSG_202308140645_IR_134_aoi.tif',
         'date': '202308140645',
         'channel': 'IR_134',
         'mission': 'MSG'},
        {'file_path': '/home/knn/Desktop/d_f_m/j_data/geoserver_data/aoi/MSG_202308140645_IR_120_aoi.tif',
         'date': '202308140645',
         'channel': 'IR_120',
         'mission': 'MSG'},
        {'file_path': '/home/knn/Desktop/d_f_m/j_data/geoserver_data/aoi/MSG_202308140645_IR_108_aoi.tif',
         'date': '202308140645',
         'channel': 'IR_108',
         'mission': 'MSG'},
        {'file_path': '/home/knn/Desktop/d_f_m/j_data/geoserver_data/aoi/MSG_202308140645_IR_097_aoi.tif',
         'date': '202308140645',
         'channel': 'IR_097',
         'mission': 'MSG'},
        {'file_path': '/home/knn/Desktop/d_f_m/j_data/geoserver_data/aoi/MSG_202308140645_IR_087_aoi.tif',
         'date': '202308140645',
         'channel': 'IR_087',
         'mission': 'MSG'},
        {'file_path': '/home/knn/Desktop/d_f_m/j_data/geoserver_data/aoi/MSG_202308140645_IR_039_aoi.tif',
         'date': '202308140645',
         'channel': 'IR_039',
         'mission': 'MSG'},
        {'file_path': '/home/knn/Desktop/d_f_m/j_data/geoserver_data/aoi/MSG_202308140645_IR_016_aoi.tif',
         'date': '202308140645',
         'channel': 'IR_016',
         'mission': 'MSG'},
        {'file_path': '/home/knn/Desktop/d_f_m/j_data/geoserver_data/aoi/MSG_202308140645_HRV_aoi.tif',
         'date': '202308140645',
         'channel': 'HRV',
         'mission': 'MSG'},
    ]
    for file_info in geotiff_files:
        store_name = f"{file_info['date']}_{file_info['channel']}"
        layer_name = store_name
        geoserver.create_store(store_name, file_info['file_path'])
        geoserver.publish_layer(layer_name)
