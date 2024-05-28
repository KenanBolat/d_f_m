import requests
from requests.auth import HTTPBasicAuth

GEOSERVER_URL = 'http://localhost:8080/geoserver/rest'
GEOSERVER_USER = 'admin'
GEOSERVER_PASSWORD = 'geoserver'



# Function to create a workspace
def create_workspace(workspace_name):
    data = f"""
    <workspace>
        <name>{workspace_name}</name>
    </workspace>
    """
    response = requests.post(
        f'{GEOSERVER_URL}/workspaces',
        headers={'Content-type': 'text/xml'},
        data=data,
        auth=HTTPBasicAuth(GEOSERVER_USER, GEOSERVER_PASSWORD)
    )
    response.raise_for_status()

def check_workspace(workspace_name):
    response = requests.get(
        f'{GEOSERVER_URL}/workspaces/{workspace_name}',
        auth=HTTPBasicAuth(GEOSERVER_USER, GEOSERVER_PASSWORD)
    )
    return response.status_code == 200
def create_geotiff_store(workspace, store_name, geotiff_path):
    headers = {'Content-type': 'text/xml'}
    data = f"""
    <coverageStore>
        <name>{store_name}</name>
        <workspace>{workspace}</workspace>
        <enabled>true</enabled>
        <type>GeoTIFF</type>
        <url>file:{geotiff_path}</url>
    </coverageStore>
    """
    response = requests.post(
        f'{GEOSERVER_URL}/workspaces/{workspace}/coveragestores',
        headers=headers,
        data=data,
        auth=HTTPBasicAuth(GEOSERVER_USER, GEOSERVER_PASSWORD)
    )
    response.raise_for_status()


def check_geotiff_store(workspace, store_name):
    response = requests.get(
        f'{GEOSERVER_URL}/workspaces/{workspace}/coveragestores/{store_name}',
        auth=HTTPBasicAuth(GEOSERVER_USER, GEOSERVER_PASSWORD)
    )
    return response.status_code == 200


def publish_geotiff_layer(workspace, store_name, layer_name):
    data = f"""
    <coverage>
        <name>{layer_name}</name>
        <nativeName>{layer_name}</nativeName>
        <namespace>
            <name>{workspace}</name>
        </namespace>
        <store>
            <name>{store_name}</name>
        </store>
        <srs>EPSG:4326</srs>
        <projectionPolicy>REPROJECT_TO_DECLARED</projectionPolicy>
        <enabled>true</enabled>
    </coverage>
    """
    response = requests.post(
        f'{GEOSERVER_URL}/workspaces/{workspace}/coveragestores/{store_name}/coverages',
        headers={'Content-type': 'application/xml'},
        data=data,
        auth=HTTPBasicAuth(GEOSERVER_USER, GEOSERVER_PASSWORD)
    )
    response.raise_for_status()


# Example usage
workspace_name = 'example_workspace'
geotiff_files = [
    {'file_path': 'data/aoi/IODC_202308140845_HRV_aoi.tif', 'date': '202308140600', 'channel': 'HRV',
     'mission': 'IODC'},
    {'file_path': 'data/aoi/IODC_202308140845_IR_016_aoi.tif', 'date': '202308140600', 'channel': 'IR_016',
     'mission': 'IODC'},
    {'file_path': 'data/aoi/IODC_202308140845_IR_039_aoi.tif', 'date': '202308140600', 'channel': 'IR_039',
     'mission': 'IODC'},
    {'file_path': 'data/aoi/IODC_202308140845_IR_087_aoi.tif', 'date': '202308140600', 'channel': 'IR_087',
     'mission': 'IODC'},
    {'file_path': 'data/aoi/IODC_202308140845_IR_097_aoi.tif', 'date': '202308140600', 'channel': 'IR_097',
     'mission': 'IODC'},
    {'file_path': 'data/aoi/IODC_202308140845_IR_108_aoi.tif', 'date': '202308140600', 'channel': 'IR_108',
     'mission': 'IODC'},
    {'file_path': 'data/aoi/IODC_202308140845_IR_120_aoi.tif', 'date': '202308140600', 'channel': 'IR_120',
     'mission': 'IODC'},
    {'file_path': 'data/aoi/IODC_202308140845_IR_134_aoi.tif', 'date': '202308140600', 'channel': 'IR_134',
     'mission': 'IODC'},
    {'file_path': 'data/aoi/IODC_202308140845_VIS006_aoi.tif', 'date': '202308140600', 'channel': 'VIS006',
     'mission': 'IODC'},
    {'file_path': 'data/aoi/IODC_202308140845_VIS008_aoi.tif', 'date': '202308140600', 'channel': 'VIS008',
     'mission': 'IODC'},
    {'file_path': 'data/aoi/IODC_202308140845_WV_062_aoi.tif', 'date': '202308140600', 'channel': 'WV_062',
     'mission': 'IODC'},
    {'file_path': 'data/aoi/IODC_202308140845_WV_073_aoi.tif', 'date': '202308140600', 'channel': 'WV_073',
     'mission': 'IODC'},
]



workspace_name = 'example_workspace'

if check_workspace(workspace_name):
    print(f"Workspace {workspace_name} already exists.")
else:
    create_workspace(workspace_name)
    print(f"Workspace {workspace_name} created successfully.")

for file_info in geotiff_files:
    store_name = f"{file_info['date']}_{file_info['channel']}"
    layer_name = f"{file_info['date']}_{file_info['channel']}"
    try:
        if check_geotiff_store(workspace_name, store_name):
            print(f"Store {store_name} already exists.")
        else:
            create_geotiff_store(workspace_name, store_name, file_info['file_path'])
            print(f"Store {store_name} created successfully.")
    except requests.exceptions.HTTPError as err:
        print(f"Failed to create store {store_name}: {err}")
        continue  # Skip to the next file if store creation fails

    try:
        publish_geotiff_layer(workspace_name, store_name, layer_name)
        print(f"Layer {layer_name} published successfully.")
    except requests.exceptions.HTTPError as err:
        print(f"Failed to publish layer {layer_name}: {err}")
