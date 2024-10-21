F#!/bin/bash

cd /app/;
rm -rf dataconverter tmet_sdk;

max_attempts=5
attempt_num=1
until git clone https://github.com/KenanBolat/tmet_sdk.git || [ $attempt_num -eq $max_attempts ]
do
   echo "Attempt $attempt_num of $max_attempts failed! Trying again in 5 seconds..."
   sleep 5
   attempt_num=$((attempt_num+1))
done


if [ -d "tmet_sdk" ]; then
    cd tmet_sdk;
    python setup.py install;
else
    echo "Failed to clone repository after $max_attempts attempts."
fi

cd /app/;
attempt_num=1


if [[ -z "${RABBITMQ_HOST}" ]]; then
  echo "var"
else
  echo "var2"
  until ping -c 1 ${RABBITMQ_HOST}  || [ $attempt_num -eq $max_attempts ]
    do
      echo "Attempt $attempt_num of $max_attempts failed! Trying again in 5 seconds..."
      sleep 5
      attempt_num=$((attempt_num+1))
    done
fi

# wait for rabbitmq to start
sleep 25
python server.py &
python consumer.py &
tail -f /dev/null

