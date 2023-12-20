#!/bin/bash

cd /app/;
rm -rf dataconverter;
ping -c 1 gitserver;
max_attempts=5
attempt_num=1
until git clone http://gitserver:3000/mgm/dataconverter.git || [ $attempt_num -eq $max_attempts ]
do
   echo "Attempt $attempt_num of $max_attempts failed! Trying again in 5 seconds..."
   sleep 5
   attempt_num=$((attempt_num+1))
done


until git clone http://gitserver:3000/mgm/dataconverter.git || [ $attempt_num -eq $max_attempts ]
do
   echo "Attempt $attempt_num of $max_attempts failed! Trying again in 5 seconds..."
   sleep 5
   attempt_num=$((attempt_num+1))
done
if [ -d "dataconverter" ]; then
    cd dataconverter
    python setup.py install
else
    echo "Failed to clone repository after $max_attempts attempts."
fi

cd /app/;
attempt_num=1


if [[ -z "${RABBITMQ_HOST}" ]]; then
  echo "var"
else
  until ping -c 1 ${RABBITMQ_HOST}  || [ $attempt_num -eq $max_attempts ]
    do
      echo "Attempt $attempt_num of $max_attempts failed! Trying again in 5 seconds..."
      sleep 5
      attempt_num=$((attempt_num+1))
    done
fi


python server.py &
python consumer.py &
tail -f /dev/null

