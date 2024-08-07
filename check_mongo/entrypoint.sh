#!/bin/sh

echo "Starting polling script"

chmod a+x /app/polling_script.py

/py/bin/python3 /app/polling_script.py & tail -f /dev/null

