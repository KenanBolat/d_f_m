#!/bin/bash

cd /app/;
git clone http://gitserver:3000/mgm/dataconverter.git ;
cd dataconverter;
python setup.py install ;
cd /app/;
python server.py ;