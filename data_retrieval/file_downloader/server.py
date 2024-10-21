import datetime
import os
import pika
import json
import requests

from dataconverter.communication.message_broker_if import RabbitMQInterface as rabbitmq
from dataconverter.utils.data_checker import CheckProducts as checker


class FileDownloadConsumer:
    def __init__(self, queue_name='download_tasks'):
        self._queue_name = queue_name
        self._channel = None
        self._geo_channel = None
        self._rabbit = rabbitmq(os.environ.get('RABBITMQ_HOST', 'localhost'), 5672, 'guest', 'guest', queue_name)
        self._rabbit_geo = rabbitmq(os.environ.get('RABBITMQ_HOST', 'localhost'), 5672, 'guest', 'guest', 'geoserver_tasks')


    def connect(self):
        self._channel = self._rabbit.connect()
        self._geo_channel = self._rabbit_geo.connect()

    def on_message(self, channel, method_frame, header_frame, body):
        print(f"data_downloader_server_py ==> Received message: {body}")
        try:
            message_body = json.loads(body)
            payload = {
                "satellite_mission": message_body['mission'],
                "date_tag": message_body['date'],
            }
            headers = {'Authorization': f'Token {os.environ.get("TOKEN")}', 'Content-Type': 'application/json'}
            response = requests.get(f"http://{os.environ.get('CORE_APP', 'app')}:8000/api/data/", params=payload,
                                    headers=headers)
            if response.status_code == 200 and response.json()[0]['satellite_mission'] == payload['satellite_mission']:
                files = response.json()[0]['files']
                self.download_files(payload['satellite_mission'], files)

            content = {
                'status': 'ready',
                'mission': message_body['mission'],
                'date':  message_body['date'],
                'event_id': ''
                }
            self._rabbit_geo.send(message=json.dumps(content))
            channel.basic_ack(delivery_tag=method_frame.delivery_tag)

        except Exception as e:
            print(f"data_downloader_server_py ==> Failed to process message: {e}")
            # Requeue the message for future processing
            channel.basic_nack(delivery_tag=method_frame.delivery_tag)

    def download_files(self, satellite_mission, files_list):
        checker_ = checker()
        checker_.satellite_mission(satellite_mission)
        checker_.download_files(files_list)


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
print(f"data_downloader_server_py ==> [{datetime.datetime.now().strftime('%Y%m%d%H%S')}] : ", "Starting consumer...")
consumer = FileDownloadConsumer()
consumer.run()
