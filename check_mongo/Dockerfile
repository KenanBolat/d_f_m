# Use an official Ubuntu as a parent image
FROM python:3.10.10-buster

COPY ./requirements.txt /tmp/requirements.txt
COPY ./entrypoint.sh /app/entrypoint.sh
COPY ./polling_script.py /app/polling_script.py
RUN chmod +x /app/entrypoint.sh
WORKDIR /app

# Install necessary packages
RUN apt-get update && \
    apt-get install -y inotify-tools curl


RUN python -m venv /py && \
    /py/bin/pip install --upgrade pip && \
    apt-get update && apt-get install libgl1 libpq-dev -y && \
    /py/bin/pip install -r /tmp/requirements.txt && \
    rm -rf /tmp

ENV PATH="/scripts:/py/bin:$PATH"



# Define the entrypoint for the container
ENTRYPOINT ["./entrypoint.sh"]
