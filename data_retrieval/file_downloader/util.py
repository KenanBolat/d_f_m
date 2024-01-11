import os, gridfs, pika, json
from flask import Flask, request, send_file
from flask_pymongo import PyMongo
# from auth import validate
# from auth_svc import access
# from storage import util
from bson.objectid import ObjectId
from dataconverter.communication.message_broker_if import RabbitMQInterface as rabbitmq


server = Flask(__name__)

rabbit = rabbitmq(os.environ.get('RABBITMQ_HOST', 'localhost'), 5672, 'guest', 'guest', 'data')


# from abc import ABC, abstractmethod
#
# import pika
# import json
#
#
# class Upload(ABC):
#     @abstractmethod
#     def connect(self):
#         """Connects to the database"""
#         pass
#
#     @abstractmethod
#     def upload(self, f, fs, channel, access):
#         """Uploads a file to the database"""
#         pass
#
#     @abstractmethod
#     def close(self):
#         """Closes the connection to the database"""
#         pass
#
# class UploadToMongoDB(Upload):
#     def __init__(self, mongo, fs, channel):
#         self.mongo = mongo
#         self.fs = fs
#         self.channel = channel
#
#     def connect(self):
#         self.mongo.connect()
#
#     def upload(self, f, fs, channel, access):
#         print("=" * 50)
#         try:
#             fid = fs.put(f)
#         except Exception as err:
#             print(err)
#             return "internal server error", 500
#
#         message = {
#             "data_fid": str(fid),
#             "nc_fid": None,
#             "username": access["username"],
#         }
#
#         try:
#             channel.basic_publish(
#                 exchange="",
#                 routing_key="video",
#                 body=json.dumps(message),
#                 properties=pika.BasicProperties(
#                     delivery_mode=pika.spec.PERSISTENT_DELIVERY_MODE
#                 ),
#             )
#         except Exception as err:
#             print(err)
#             fs.delete(fid)
#             return "internal server error", 500
#
#     def close(self):
#         self.mongo.close()

def upload(f, fs):
    """Uploads a file to the mongodb"""
    try:
        fid = fs.put(f)
    except Exception as err:
        print(err)
        return "internal server error", 500

    message = {
        "data_fid": str(fid),
        "nc_fid": None,
        "token": os.environ.get("TOKEN"),
    }

    if fid:
        try:
            _channel = rabbit.connect()
            payload = {
                "queue_name": "data",
                "content": f"{rabbit.get_current_time()}",
                "service_name": "Data Converter",
                "producer_ip": rabbit.get_ip(),
                "status": "Uploaded ",
                "data_fid": str(fid),
                "nc_fid": None,
                "token": os.environ.get("TOKEN"),
            }
            rabbit.send(message=json.dumps(payload))



            # channel.basic_publish(
            #     exchange="",
            #     routing_key="video",
            #     body=json.dumps(message),
            #     properties=pika.BasicProperties(
            #         delivery_mode=pika.spec.PERSISTENT_DELIVERY_MODE
            #     ),
            # )
        except Exception as err:
            print(err)
            fs.delete(fid)
            return "internal server error", 500
