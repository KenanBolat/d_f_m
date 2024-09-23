#!/bin/bash

# Check if the correct number of arguments are passed
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <subfolder_name> <days> "
    exit 1
fi

echo "Starting remove_old_files_from_ftp.sh..."
# Directory to check (update this to your target directory)
TARGET_ROOT_DIR="/media/external/ftp/"

TARGET_DIR=$TARGET_ROOT_DIR$1
echo "Removing files older than $2 days from $TARGET_DIR..."
DAYS=$2

# Check if the subfolder exists
if [ ! -d "$TARGET_DIR" ]; then
    echo "Subfolder '$TARGET_DIR' not found in '$TARGET_ROOT_DIR'"
    exit 1
fi
# Find and delete files older than 3 days
find "$TARGET_DIR" -type f -mtime +$DAYS -exec rm -f {} \;

# Optionally, delete empty directories
find "$TARGET_DIR" -mindepth 1 -type d -empty -delete

# Log the deletions
echo "$(date): Deleted files older than $DAYS days from $TARGET_DIR" >> /var/log/cleanup.log