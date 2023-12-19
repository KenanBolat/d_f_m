#!/bin/bash

cd /app/;
git clone http://gitserver:3000/mgm/dataconverter.git ;
cd dataconverter;
python setup.py install ;
cd /app/;
python server.py ;

# Start the consumer in the background
python consumer.py ;

# Prevent the script from exiting
# uwsgi --http :5021 --workers 4 --master --enable-threads --module app.wsgi