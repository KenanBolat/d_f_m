from flask import Flask
from apscheduler.schedulers.background import BackgroundScheduler
import threading
import os
import json
from datetime import datetime, timedelta

app = Flask(__name__)
scheduler = BackgroundScheduler()
job = None

# Global flag and lock for graceful shutdown
is_task_running = False
task_lock = threading.Lock()

from dataconverter.communication.message_broker_if import RabbitMQInterface as rabbitmq
from dataconverter.utils.data_checker import FtpDataCheck

rabbit = rabbitmq(os.environ.get('RABBITMQ_HOST', "localhost"), 5672, 'guest', 'guest', 'ftp_tasks')
rabbit.connect()


def ftp_check_task():
    global is_task_running
    with task_lock:
        is_task_running = True

    # Simulate FTP check (replace with real logic)
    print("FTP check started")
    try:
        # Test Success Scenario

        # Test Fail Scenario
        checker = FtpDataCheck()
        checker.full_check()
        # raise Exception("FTP check failed")
    except Exception as e:
        print(f"FTP check failed: {e}")
        payload = {
            "queue_name": "ftp-tasks",
            "content": f"{rabbit.get_current_time()}:Failed:Task:{e}",
            "service_name": "FTP Checker",
            "producer_ip": rabbit.get_ip(),
            "status": "Failed",
        }
        rabbit.send(message=json.dumps(payload))

    with task_lock:
        is_task_running = False


@app.route('/start', methods=['GET'])
def start_monitoring():
    global job
    if not scheduler.running:
        job = scheduler.add_job(ftp_check_task, 'interval', minutes=10,
                                next_run_time=datetime.now() + timedelta(minutes=1))
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
        app.run(debug=True, host='0.0.0.0', port=5000)
    finally:
        rabbit.close()
