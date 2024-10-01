#!/bin/bash

# Set the threshold percentage (e.g., 80%)
THRESHOLD=80
OLDER_THAN_DAYS=2

# Get the current usage percentage of the / partition (without the % sign)
USAGE=$(df / | grep '/' | awk '{print $5}' | sed 's/%//')

# Check if the usage exceeds the threshold
if [ "$USAGE" -gt "$THRESHOLD" ]; then
    echo "Disk usage on / has exceeded ${THRESHOLD}%. Running cleanup script..."

    # Run the cleanup script with the specified parameters
    /media/external/d_f_m/scripts/remove_old_files_from_directory.sh /mnt/data/ tmp  $OLDER_THAN_DAYS
    /media/external/d_f_m/scripts/remove_old_files_from_directory.sh /mnt/data/ eumetcast  $OLDER_THAN_DAYS

    /media/external/d_f_m/scripts/remove_old_files_from_directory.sh /data/ tmp  $OLDER_THAN_DAYS
    /media/external/d_f_m/scripts/remove_old_files_from_directory.sh /data/ eumetcast  $OLDER_THAN_DAYS
else
    echo "Disk usage on / is under control (${USAGE}%). No action needed."
fi