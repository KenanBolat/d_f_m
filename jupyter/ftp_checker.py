import pika
import os
from ftplib import FTP
import json

ftp_server = 'localhost'
ftp_port = 201
ftp_user = 'foo'
ftp_password = 'bar'

rabbitmq_host = 'localhost'
rabbitmq_port = 5672
rabbitmq_user = 'guest'
rabbitmq_password = 'guest'
rabbitmq_queue = 'ftp_queue'

# Setup Rabbitmq connection
connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
channel = connection.channel()


def download_latest_file():
    with FTP(ftp_server) as ftp:
        ftp.connect(host=ftp_server, port=ftp_port)
        ftp.login(user=ftp_user, passwd=ftp_password)
        filenames = ftp.nlst
        # Add logic to find the latest file, this is just an example
        latest_file = max(filenames)
        local_path = f"/home/knn/Desktop/download_data/{latest_file}"
        with open(local_path, 'wb') as f:
            ftp.retrbinary(f'RETR {latest_file}', f.write)
        return latest_file, local_path


def main():
    latest_file, local_path = download_latest_file()
    # Publishing message to RabbitMQ
    channel.basic_publish(
        exchange='',
        routing_key=rabbitmq_queue,
        body=f'Download complete for {latest_file}')
    print(f" [x] Sent 'Download complete for {latest_file}'")

    # Close the connection
    connection.close()
if __name__ == "__main__":
    main()



# producer = Producer({'bootstrap.servers': kafka_broker})
#
# def delivery_report(err, msg):
#     if err is not None:
#         print('Message delivery failed: {}'.format(err))
#     else:
#         print('Message delivered to {} [{}]'.format(msg.topic(), msg.partition()))
#
# def download_latest_file():
#     with FTP(ftp_server) as ftp:
#         ftp.login(user=ftp_user, passwd=ftp_password)
#         filenames = ftp.nlst()
#         latest_file = max(filenames)
#         local_path = f"./downloaded_files/{latest_file}"
#         os.makedirs(os.path.dirname(local_path), exist_ok=True)
#         with open(local_path, 'wb') as f:
#             ftp.retrbinary(f'RETR {latest_file}', f.write)
#         return latest_file, local_path
#
# def produce_message(filename, local_path):
#     data = {'filename': filename, 'local_path': local_path}
#     producer.produce(kafka_topic, json.dumps(data).encode('utf-8'), callback=delivery_report)
#     producer.flush()
#
# if __name__ == "__main__":
#     latest_file, local_path = download_latest_file()
#     produce_message(latest_file, local_path)
