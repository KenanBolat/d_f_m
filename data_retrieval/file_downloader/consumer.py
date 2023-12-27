import datetime
import os
import pika
import json
import requests

from dataconverter.communication.message_broker_if import RabbitMQInterface as rabbitmq
from dataconverter.utils.data_checker import CheckProducts as checker

from converter import DataConverter


class FileConverterConsumer:
    def __init__(self, queue_name='geoserver_tasks'):
        self._queue_name = queue_name
        self._channel = None
        self._rabbit = rabbitmq(os.environ.get('RABBITMQ_HOST', 'localhost'), 5672, 'guest', 'guest', queue_name)

    def connect(self):
        self._channel = self._rabbit.connect()

    def on_message(self, channel, method_frame, header_frame, body):
        print(f"Received message: {body}")
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
                files = response.json()[0]['files']
                date_tag = response.json()[0]['date_tag']
                satellite_mission = response.json()[0]['satellite_mission']
                id = response.json()[0]['id']
                dcv = DataConverter(date_tag, satellite_mission, id, file_list=files)
                dcv.convert()

            channel.basic_ack(delivery_tag=method_frame.delivery_tag)

        except Exception as e:
            print(f"Failed to process message: {e}")
            # Requeue the message for future processing
            channel.basic_nack(delivery_tag=method_frame.delivery_tag)

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
            if self._connection.is_open:
                self._connection.close()

    def run(self):
        self.connect()
        self.start_consuming()


# Usage
print(f"[{datetime.datetime.now().strftime('%Y%m%d%H%S')}] : ", "Starting consumer...")
consumer = FileConverterConsumer()
consumer.run()
