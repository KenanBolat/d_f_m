#!/bin/bash

while getopts 'arch' opt; do
  case "$opt" in
    a)
      echo "Processing option 'a'"
      DIRECTORY_TO_WATCH="/home/knn/Desktop/d_f_m/j_data/geoserver_data/data/aoi"
      DIRECTORY_TO_UPDATE="/opt/geoserver_data/data/aoi"
      ;;
    r)
      echo "Processing option 'rgb'"
      DIRECTORY_TO_WATCH="/home/knn/Desktop/d_f_m/j_data/geoserver_data/data/rgb"
      DIRECTORY_TO_UPDATE="/opt/geoserver_data/data/rgb"
      ;;
    c)
      echo "Processing option 'c' argument"
      DIRECTORY_TO_WATCH="/home/knn/Desktop/d_f_m/j_data/geoserver_data/data/cloud"
      DIRECTORY_TO_UPDATE="/opt/geoserver_data/data/cloud"
      ;;
   
    ?|h)
      echo "Usage: $(basename $0) [-a] [-r] [-c]"
      exit 1
      ;;
  esac
done
shift "$(($OPTIND -1))"


GEOSERVER_URL="http://localhost:8080/geoserver"
WORKSPACE="tmet"
COVERAGESTORE="tmet"
USERNAME="admin"
PASSWORD="geoserver"

inotifywait -m -e create "$DIRECTORY_TO_WATCH" --format '%w%f' | while read NEW_FILE
do
    echo "New file detected: $NEW_FILE"
    echo "Triggering GeoServer update..."

    curl -v -u $USERNAME:$PASSWORD -XPOST -H "Content-type: text/plain" \
         -d "file://$DIRECTORY_TO_UPDATE" \
         "$GEOSERVER_URL/rest/workspaces/$WORKSPACE/coveragestores/$COVERAGESTORE/external.imagemosaic"

    echo "GeoServer update triggered."
done

