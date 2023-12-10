from flask import Flask
from apscheduler.schedulers.background import BackgroundScheduler
import threading
import time
import os
import json
from test_files_and_folders import CheckProducts
import requests
from datetime import datetime

app = Flask(__name__)
scheduler = BackgroundScheduler()
job = None

# Global flag and lock for graceful shutdown
is_task_running = False
task_lock = threading.Lock()

# RabbitMQ Setup
# rabbitmq_host = 'localhost'  # Change as necessary
from messagebroker import RabbitMQInterface as rabbitmq

rabbit = rabbitmq(os.environ.get('RABBITMQ_HOST'), 5672, 'guest', 'guest', 'ftp_tasks')
rabbit.connect()


def ftp_check_task():
    global is_task_running
    with task_lock:
        is_task_running = True

    # Simulate FTP check (replace with real logic)
    print("FTP check started")
    try:
        time.sleep(8)  # Simulate time taken to check FTP
        print("1 FTP checking...")
        satellite_mission = CheckProducts()
        satellite_mission.get_missions()

        for mission in satellite_mission.available_missions:
            print(f"[ {str(datetime.now())} ]Checking mission: {mission}")
            satellite_mission.satellite_mission(mission)
            res = satellite_mission.check()
            print(res)
            print(f"[ {str(datetime.now())} ]Done checking mission: {mission}")
            print('-' * 50)


            url = "http://localhost:8000/api/events/"
            payload = {
                "queue_name": "ftp-tasks",
                "content": f"{rabbit.get_current_time()}::{res}",
                "service_name": "FTP Checker",
                "producer_ip": rabbit.get_ip(),
            }
            r = requests.post("http://localhost:8000/api/events/", json=payload)
            if r.status_code == 201:
                message_id = r.json()['message_id']
                print(f"Message ID: {message_id}")
                print("Event sent successfully")

        # Test Fail Scenario
        # raise Exception("FTP check failed")
    except Exception as e:
        print(f"FTP check failed: {e}")
        payload = {
            "queue_name": "ftp-tasks",
            "content": f"{rabbit.get_current_time()}:Failed:Task:{e}",
            "service_name": "FTP Checker",
            "producer_ip": rabbit.get_ip(),
        }
        rabbit.send(message=json.dumps(payload))

    with task_lock:
        is_task_running = False


@app.route('/start', methods=['GET'])
def start_monitoring():
    global job
    if not scheduler.running:
        job = scheduler.add_job(ftp_check_task, 'interval', minutes=1)
        # job = scheduler.add_job(ftp_check_task, 'interval', minutes=1)
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
        rabbit.close()
