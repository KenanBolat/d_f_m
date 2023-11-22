import threading
from server import app  # Import your Flask app
import consumer  # Import your RabbitMQ consumer script


def run_flask():
    app.run(debug=False, host='0.0.0.0')


def run_consumer():
    consumer.start_consuming()  # Function that starts the consumer


if __name__ == '__main__':
    flask_thread = threading.Thread(target=run_flask)
    consumer_thread = threading.Thread(target=run_consumer)

    flask_thread.start()
    consumer_thread.start()

    flask_thread.join()
    consumer_thread.join()
