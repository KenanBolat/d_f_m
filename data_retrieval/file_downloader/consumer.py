import datetime
import os
import time

import pika
import json
import requests

from dataconverter.communication.message_broker_if import RabbitMQInterface as rabbitmq


from converter import DataConverter


class FileConverterConsumer:
    def __init__(self, queue_name='geoserver_tasks'):
        self._queue_name = queue_name
        self._channel = None
        self._connection = None
        self._rabbit = rabbitmq(os.environ.get('RABBITMQ_HOST', 'localhost'), 5672, 'guest', 'guest', queue_name)

    def connect(self):
        print("data_down_consumer ==> Connecting to RabbitMQ...")
        self._channel = self._rabbit.connect()
        print("data_down_consumer ==> Connected to RabbitMQ...")
        self._channel.basic_qos(prefetch_count=1)

    def on_message(self, channel, method_frame, header_frame, body):
        print(f"data_down_consumer ==> Received message: {body}")
        print("data_down_consumer ==> Processing successful, acknowledging message...")
        print("data_down_consumer ==> Message acknowledged.")
        try:
            message_body = json.loads(body)
            payload = {
                "satellite_mission": message_body['mission'],
                "date_tag": message_body['date'],
            }
            headers = {'Authorization': f'Token {os.environ.get("TOKEN")}', 'Content-Type': 'application/json'}
            response = requests.get(f"http://{os.environ.get('CORE_APP', 'localhost')}:8000/api/data/",
                                    params=payload,
                                    headers=headers)
            if response.status_code == 200 and len(response.json()) == 1:
                channel.basic_ack(delivery_tag=method_frame.delivery_tag)
                files = response.json()[0]['files']
                date_tag = response.json()[0]['date_tag']
                satellite_mission = response.json()[0]['satellite_mission']
                id = response.json()[0]['id']

                # Add time constraint to process the message
                threshold_lower_bound = time.strptime('0500', '%H%M')
                threshold_upper_bound = time.strptime('2000', '%H%M')
                current_time =  time.strptime(date_tag[8:],'%H%M')

                # Check if the current time is within the defined time constraint
                if threshold_lower_bound < current_time < threshold_upper_bound:
                    print(f"DateTag is in between the defined time constraint ==> Processing message: {current_time}")
                    dcv = DataConverter(date_tag, satellite_mission, id, file_list=files)
                    dcv.convert()
                    dcv.remove_files()
                    print(f"DateTag : {date_tag} has been processed successfully @ {datetime.datetime.now().strftime('%Y%m%d%H%S')}")
                    print(f"V"*100)
                else:
                    print(f"X"*100)
                    print(f"DateTag is outside the defined time constraint ==> Skipping message: {current_time} @ {datetime.datetime.now().strftime('%Y%m%d%H%S')}")
                    print(f"X"*100)

            else:
                print(f"data_down_consumer ==> Failed to retrieve data: {response.status_code} {response.json()}")



        except Exception as e:
            print(f"data_down_consumer ==> Failed to process message: {e}")
            # Requeue the message for future processing
            # TODO: Add a retry limit

            # channel.basic_nack(delivery_tag=method_frame.delivery_tag)

    def start_consuming(self):
        self._channel.basic_consume(queue=self._queue_name, on_message_callback=self.on_message)
        try:
            self._channel.start_consuming()
        except KeyboardInterrupt:
            self._channel.stop_consuming()
        except pika.exceptions.ConnectionClosedByBroker:
            # Uncomment this to automatically reconnect
            # self.start_consuming()
            pass
        finally:
            if self._channel.is_open:
                self._channel.close()

    def run(self):
        self.connect()
        print("data_down_consumer ==> Consumer connected...")
        self.start_consuming()
        print("data_down_consumer ==> Consumer started...")


# Usage
print(f"data_down_consumer ==> [{datetime.datetime.now().strftime('%Y%m%d%H%S')}] : ", "Starting consumer...")
consumer = FileConverterConsumer()
consumer.run()
