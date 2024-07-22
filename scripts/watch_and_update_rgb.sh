#!/bin/bash

DIRECTORY_TO_WATCH="/home/knn/Desktop/d_f_m/j_data/geoserver_data/data/aoi"
DIRECTORY_TO_UPDATE="/opt/geoserver_data/data/aoi"
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

