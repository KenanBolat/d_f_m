#!/bin/bash

cd /app/;
git clone http://gitserver:3000/mgm/dataconverter.git ;
cd dataconverter;
python setup.py install ;

cd /app; 

git clone https://gitlab.eumetsat.int/open-source/PublicDecompWT.git
cd PublicDecompWT;
cd xRITDecompress;
make -f Makefile;
make install;
#conda init;
#source /opt/conda/bin/activate;
#conda install -y conda-install;



cd /app/;
python server.py ;
