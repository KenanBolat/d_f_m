from flask import Flask
from apscheduler.schedulers.background import BackgroundScheduler
import threading
import pika
import time
import os

app = Flask(__name__)
scheduler = BackgroundScheduler()
job = None

# Global flag and lock for graceful shutdown
is_task_running = False
task_lock = threading.Lock()

# RabbitMQ Setup
# rabbitmq_host = 'localhost'  # Change as necessary
rabbitmq_host = os.environ.get('RABBITMQ_HOST')
connection = pika.BlockingConnection(
    pika.ConnectionParameters(host=rabbitmq_host, heartbeat=600, blocked_connection_timeout=300))
channel = connection.channel()
channel.queue_declare(queue='ftp_tasks')


def publish_message(body):
    channel.basic_publish(exchange='',
                          routing_key='ftp_tasks',
                          body=body)


def ftp_check_task():
    global is_task_running
    with task_lock:
        is_task_running = True
        publish_message('FTP check started')

    # Simulate FTP check (replace with real logic)
    print("FTP check started")
    try:
        time.sleep(8)  # Simulate time taken to check FTP
        print("1 FTP checking...")
        # time.sleep(8)  # Simulate time taken to check FTP
        # print("2 FTP check...")
        # time.sleep(8)  # Simulate time taken to check FTP
        # print("3 FTP check...")
        # time.sleep(8)  # Simulate time taken to check FTP
        print("4 FTP check done")
        publish_message('FTP check completed successfully')
        raise Exception("FTP check failed")
    except Exception as e:
        print(f"FTP check failed: {e}")
        publish_message(f'FTP check failed: {e}')

    with task_lock:
        is_task_running = False


@app.route('/start', methods=['GET'])
def start_monitoring():
    global job
    if not scheduler.running:
        job = scheduler.add_job(ftp_check_task, 'interval', minutes=1)
        scheduler.start()
        return "FTP Monitoring Started"
    return "FTP Monitoring is already running"


@app.route('/stop', methods=['GET'])
def stop_monitoring():
    global scheduler, job
    if scheduler.running:
        # Wait for the ongoing task to complete
        with task_lock:
            if job:
                job.remove()
                job = None
            scheduler.shutdown(wait=False)
            scheduler = BackgroundScheduler()
        return "FTP Monitoring Stopped"

    return "FTP Monitoring is not running"


@app.route('/status', methods=['GET'])
def status():
    return f"FTP Monitoring Running: {scheduler.running}, Task Running: {is_task_running}"


# Call the start monitoring method directly
start_monitoring()

if __name__ == '__main__':
    try:
        app.run(debug=True, host='0.0.0.0')
    finally:
        connection.close()
