#!/bin/bash

echo "Starting watch_and_update.sh..."
# Check for required environment variables
if [[ -z "$DIRECTORY_TO_WATCH" || -z "$GEOSERVER_URL" || -z "$GEOSERVER_URL" || -z "$WORKSPACE" || -z "$COVERAGESTORE" || -z "$USERNAME" || -z "$PASSWORD" ]]; then
  echo "One or more required environment variables are missing."
  exit 1
fi

inotifywait -m -e create "$DIRECTORY_TO_WATCH" --format '%w%f' | while read NEW_FILE
do
    echo "New file detected: $NEW_FILE"
    echo "Triggering GeoServer update..."

    echo "=========================================="
    echo "curl -v -u $USERNAME:$PASSWORD -XPOST -H \"Content-type: text/plain\" -d \"file:///opt/geoserver_data/data/$DIRECTORY_TO_UPDATE\" \"$GEOSERVER_URL/rest/workspaces/$WORKSPACE/coveragestores/$COVERAGESTORE/external.imagemosaic\""
    echo "=========================================="
    curl -v -u $USERNAME:$PASSWORD -XPOST -H "Content-type: text/plain" \
         -d "file:///opt/geoserver_data/data/$DIRECTORY_TO_UPDATE" \
         "$GEOSERVER_URL/rest/workspaces/$WORKSPACE/coveragestores/$COVERAGESTORE/external.imagemosaic"

    echo "GeoServer update triggered."
done
