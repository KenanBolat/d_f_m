import os
import pika
import json
import requests
from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Hello, World!'


if __name__ == "__main__":
    app.run(host='localhost', port=3003, debug=True)
