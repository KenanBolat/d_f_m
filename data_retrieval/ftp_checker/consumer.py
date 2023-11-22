import pika
import requests
import os


def callback(ch, method, properties, body):
    print(f"Received {body}")
    # Logic to handle the message
    # Re-initiate the FTP check process if a failure message is received
    if "failed" in body.decode("utf-8"):
        print("FTP check failed. Re-initiating FTP check process")
        # ftp_check_task()

        response = requests.get(
            f"http://{os.environ.get('FTP_CHECKER_SVC')}:{os.environ.get('FTP_CHECKER_PORT')}/start",
        )

        if response.status_code == 200:
            return response.text, None
        else:
            return None, (response.text, response.status_code)


def start_consuming():
    connection = pika.BlockingConnection(pika.ConnectionParameters(os.environ.get('RABBITMQ_HOST')))
    channel = connection.channel()

    channel.queue_declare(queue='ftp_tasks')
    channel.basic_consume(queue='ftp_tasks', on_message_callback=callback, auto_ack=True)

    print('Waiting for messages. To exit press CTRL+C')
    channel.start_consuming()
