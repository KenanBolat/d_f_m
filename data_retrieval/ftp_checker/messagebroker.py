import pika
import socket
import datetime
class RabbitMQInterface:
    def __init__(self, host, port, username, password, queue_name):
        self.host = host
        self.port = port
        self.username = username
        self.password = password
        self.queue_name = queue_name

    def connect(self):
        credentials = pika.PlainCredentials(self.username, self.password)
        parameters = pika.ConnectionParameters(self.host, self.port, '/', credentials,
                                               heartbeat=600, blocked_connection_timeout=300)
        connection = pika.BlockingConnection(parameters)
        channel = connection.channel()
        channel.queue_declare(queue=self.queue_name)
        return channel

    def send(self, message):
        channel = self.connect()
        channel.basic_publish(exchange='', routing_key=self.queue_name, body=message)
        channel.close()

    def receive(self):
        channel = self.connect()
        method_frame, header_frame, body = channel.basic_get(queue=self.queue_name, auto_ack=True)
        if method_frame:
            channel.basic_ack(method_frame.delivery_tag)
            return body.decode('utf-8')
        else:
            return None

    @staticmethod
    def get_ip():
        return socket.gethostbyname(socket.gethostname())

    @staticmethod
    def get_current_time():
        return datetime.datetime.now().strftime("%Y%m%d%H%S")

