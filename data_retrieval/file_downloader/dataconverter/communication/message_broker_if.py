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
        self.connection = None
        self.channel = None

    def connect(self):
        if not self.connection or self.connection.is_closed:
            credentials = pika.PlainCredentials(self.username, self.password)
            parameters = pika.ConnectionParameters(self.host, self.port, '/', credentials,
                                                   heartbeat=600, blocked_connection_timeout=300)
            connection = pika.BlockingConnection(parameters)
            self.channel = connection.channel()
            self.channel.queue_declare(queue=self.queue_name)
        return self.channel

    def send(self, message):
        if not self.connection or self.connection.is_closed:
            self.connect()

        self.channel.basic_publish(exchange='', routing_key=self.queue_name, body=message)
        self.channel.close()

    def receive(self):
        if not self.connection or self.connection.is_closed:
            self.channel = self.connect()
        method_frame, header_frame, body = self.channel.basic_get(queue=self.queue_name, auto_ack=True)
        if method_frame:
            ## Process the message
            self.channel.basic_ack(delivery_tag=method_frame.delivery_tag)
            ## Acknowledge the message
            return body.decode('utf-8')
        else:
            return None

    def close(self):
        if self.connection and self.connection.is_open:
            self.connection.close()

    @staticmethod
    def get_ip():
        return socket.gethostbyname(socket.gethostname())

    @staticmethod
    def get_current_time():
        return datetime.datetime.now().strftime("%Y%m%d%H%S")

