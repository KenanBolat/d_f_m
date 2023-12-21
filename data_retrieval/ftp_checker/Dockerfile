FROM python:3.11-slim-bullseye

RUN apt-get update \
  && apt-get install -y --no-install-recommends --no-install-suggests git iputils-ping netcat \
  build-essential \
  && pip install --no-cache-dir --upgrade pip

COPY .env /.env


WORKDIR /app
COPY ./requirements.txt /app
#COPY temp/ /app/.temp
RUN pip install --no-cache-dir --requirement /app/requirements.txt
COPY . /app
COPY ./initiator.sh ./initiator.sh
ENV PYTHONUNBUFFERED=1

EXPOSE 5021

CMD ["bash","initiator.sh"]
#CMD ["python", "server.py"]
#CMD ["python", "initiator.py"]

