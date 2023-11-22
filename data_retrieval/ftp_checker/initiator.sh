#!/bin/bash

# Start the Flask app in the background
python server.py &

# Start the RabbitMQ consumer in the background
python consumer.py &

# Prevent the script from exiting
# uwsgi --http :5021 --workers 4 --master --enable-threads --module app.wsgi