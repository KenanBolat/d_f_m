import time

import pika
import requests
import json

import datetime
import os
from dataconverter.communication.message_broker_if import RabbitMQInterface as rabbitmq


rabbit_ftp = rabbitmq(os.environ.get('RABBITMQ_HOST', 'localhost'), 5672, 'guest', 'guest', 'ftp_tasks')
rabbit_geo = rabbitmq(os.environ.get('RABBITMQ_HOST', 'localhost'), 5672, 'guest', 'guest', 'geoserver_tasks')
rabbit_download = rabbitmq(os.environ.get('RABBITMQ_HOST', 'localhost'), 5672, 'guest', 'guest', 'download_tasks')


def callback(ch, method, properties, body):
    rabbit_ftp.connect()
    rabbit_geo.connect()
    token = os.environ.get('TOKEN')
    headers = {'Authorization': f'Token {token}', 'Content-Type': 'application/json'}
    print(f"Received {body}")

    # Re-initiate the FTP check process if a failure message is received
    data = json.loads(body)
    if data['status'] == 'ready':
        payload = {'satellite_mission': data['mission'],
                   'date_tag': data['date'],
                   }
        headers = {'Authorization': f'Token {token}', 'Content-Type': 'application/json'}

        response_current = requests.get(f"http://{os.environ.get('CORE_APP', 'localhost')}:8000/api/data/",
                                        params=payload,
                                        headers=headers)

        ##
        # Initiate the download process
        if response_current.status_code == 200 and response_current.json()[0]['status'] == 'ready':
            response_on_update = requests.patch(f"http://{os.environ.get('CORE_APP', 'localhost')}:8000/api/data/{response_current.json()[0]['id']}/",
                                                data=json.dumps({
                                                    "status": "downloading",
                                                }), headers=headers)
            rabbit_download.send(message=json.dumps({
                "status": "downloading",
                "mission": data['mission'],
                "date": data['date'],
                "event_id": data['event_id'],

            }))

            time.sleep(5)
            if response_on_update.status_code == 200 and response_on_update.json()['status'] == 'downloading':
                response_done = requests.patch(f"http://{os.environ.get('CORE_APP', 'localhost')}:8000/api/data/{response_current.json()[0]['id']}/",
                                               data=json.dumps({
                                                   "status": "done",
                                               }), headers=headers)
                time.sleep(5)
                ##
                if response_done.status_code == 200 and response_done.json()['status'] == 'done':
                    content = {
                        'status': 'ready',
                        'mission': data['mission'],
                        'date': data['date'],
                        'event_id': data['event_id']
                    }
                    rabbit_geo.send(message=json.dumps(content))


def start_consuming():
    connection = pika.BlockingConnection(pika.ConnectionParameters(os.environ.get('RABBITMQ_HOST', 'localhost')))
    channel = connection.channel()

    channel.queue_declare(queue='ftp_tasks')
    channel.basic_consume(queue='ftp_tasks', on_message_callback=callback, auto_ack=True)

    print('Waiting for messages. To exit press CTRL+C')
    channel.start_consuming()


if __name__ == '__main__':
    start_consuming()
