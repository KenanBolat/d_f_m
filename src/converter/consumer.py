import pika, sys, os, time
from pymongo import MongoClient
import gridfs
from convert import to_mp3


def main():
    # client = MongoClient("host.minikube.internal", 27017)
    client = MongoClient("localhost", 27017)
    db_videos = client.videos
    db_mp3s = client.mp3s
    db_data = client.data
    db_ncdf = client.ncdf
    # gridfs
    fs_videos = gridfs.GridFS(db_videos)
    fs_mp3s = gridfs.GridFS(db_mp3s)
    fs_data = gridfs.GridFS(db_data)
    fs_ncdf = gridfs.GridFS(db_ncdf)

    # rabbitmq connection
    # connection = pika.BlockingConnection(pika.ConnectionParameters(host="rabbitmq"))
    connection = pika.BlockingConnection(pika.URLParameters('amqp://guest:guest@localhost:5672/'))

    channel = connection.channel()

    def callback(ch, method, properties, body):
        err = to_mp3.start(body, fs_data, fs_ncdf, ch)
        if err:
            ch.basic_nack(delivery_tag=method.delivery_tag)
        else:
            ch.basic_ack(delivery_tag=method.delivery_tag)

    channel.basic_consume(
        queue=os.environ.get("VIDEO_QUEUE"), on_message_callback=callback
    )

    print("Waiting for messages. To exit press CTRL+C")

    channel.start_consuming()

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("Interrupted")
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)
