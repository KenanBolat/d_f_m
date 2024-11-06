


#Install the required packages
apt-get install  apache2-utils
apt-get install siege
# Run the tests

# Check the ab command whether it is installed or not
if ! [ -x "$(command -v ab)" ]; then
  echo 'Error: ab is not installed.' >&2
  exit 1
else
  echo 'ab is installed.'
  ab -n 1000 -c 100 http://localhost:8000/static/media/images/MSG_202308140600_HRV_aoi.png
  ab -n 1000 -c 100 http://localhost:8000/api/get_geoserver_data/

fi


# Check the ab command whether it is installed or not
if ! [ -x "$(command -v siege)" ]; then
  echo 'Error: siege is not installed.' >&2
  exit 1
else
  echo 'siege is installed.'
  siege -c 200 -t 600S http://localhost:8000/static/media/images/MSG_202308140600_HRV_aoi.png
fi
