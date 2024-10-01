#!/bin/bash

# Remove files older than a certain number of days from a folder
# Check if the correct number of arguments are passed
if [ "$#" -ne 3 ]; then
    echo "Usage: $0 <targe_folder> <subfolder_name> <days> "
    exit 1
fi

# Remove trailing slashes from the target folder and subfolder
TARGET=$(echo "$1" | sed 's:/*$::')
SUB_FOLDER=$(echo "$2" | sed 's:/*$::')
TARGET_ROOT_DIR=$TARGET


echo "Starting remove_old_files_from_ftp.sh..."
# Directory to check (update this to your target directory)

TARGET_DIR=$TARGET_ROOT_DIR/$SUB_FOLDER
echo "Removing files older than $2 days from $TARGET_DIR..."
DAYS=$3
echo "DAYS: $DAYS"
# Check if the subfolder exists
if [ ! -d "$TARGET_DIR" ]; then
    echo "Subfolder '$TARGET_DIR' not found in '$TARGET_ROOT_DIR'"
    exit 1
fi
# Find and delete files older than given days
find "$TARGET_DIR" -type f -mtime +$DAYS -exec rm -f {} \;

# Optionally, delete empty directories
if $DELETE_EMPTY_DIRS; then
    find "$TARGET_DIR" -mindepth 1 -type d -empty -delete
fi

# Log the deletions
echo "$(date): Deleted files older than $DAYS days from $TARGET_DIR" >> /var/log/cleanup.log