import pika
import requests
import datetime
import os
from j_data.test_files_and_folders import CheckProducts
import json

def callback(ch, method, properties, body):
    print(f"Received {body}")

    satellite_mission = CheckProducts()
    satellite_mission.get_missions()

    for mission in satellite_mission.available_missions:
        print(f"[ {str(datetime.datetime.now())} ]Checking mission: {mission}")
        satellite_mission.satellite_mission(mission)
        satellite_mission.check()
        print(f"[ {str(datetime.datetime.now())} ]Done checking mission: {mission}")
        print('-----------------------------------------------')
        url = "http://localhost:8080"

    # Logic to handle the message
    # Re-initiate the FTP check process if a failure message is received
    if "failed" in body.decode("utf-8"):
        print("FTP check failed. Re-initiating FTP check process")
        # ftp_check_task()

        # response = requests.get(
        #     f"http://{os.environ.get('FTP_CHECKER_SVC')}:{os.environ.get('FTP_CHECKER_PORT')}/start",
        # )
        #
        # if response.status_code == 200:
        #     return response.text, None
        # else:
        return None


def start_consuming():
    connection = pika.BlockingConnection(pika.ConnectionParameters(os.environ.get('RABBITMQ_HOST')))
    channel = connection.channel()

    channel.queue_declare(queue='ftp_tasks')
    channel.basic_consume(queue='ftp_tasks', on_message_callback=callback, auto_ack=True)

    print('Waiting for messages. To exit press CTRL+C')
    channel.start_consuming()


if __name__ == '__main__':
    start_consuming()
