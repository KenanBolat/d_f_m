#!/bin/bash

# Folder path to clear

declare -a DIRECTORIES=(
  "/app/temp/"
  "/app/downloaded_files/"
)

MINUTES=${1:-120}  # Default is 120 minutes if no argument is provided

if [ -z "$1" ]; then
    MINUTES=${FILE_AGE_LIMIT:-120}  # Use environment variable or default to 120
fi


for DIRECTORY in "${DIRECTORIES[@]}"; do
    echo $DIRECTORY
    if [ -d "$DIRECTORY" ]; then
        echo "Clearing files older than $MINUTES minutes in $DIRECTORY"
        # Find and delete files older than 120 minutes recursively
        find "$DIRECTORY" -type f -mmin +$MINUTES -exec rm -v {} \;
        echo "Files older than $MINUTES minutes have been removed from $DIRECTORY"
    else
        echo "Directory does not exist: $DIRECTORY"
    fi
done



