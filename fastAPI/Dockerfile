FROM python:3.10
LABEL maintainer='Kenan BOLAT'

ENV PYTHONUNBUFFERED 1
COPY ./requirements.txt /tmp/requirements.txt
COPY . /app
WORKDIR /app
EXPOSE 8090

RUN apt-get update && apt-get install libgl1 -y
RUN pip install --upgrade pip
RUN pip install -r /tmp/requirements.txt
RUN mkdir -p /root/.deepface/weights/
RUN wget https://github.com/serengil/deepface_models/releases/download/v1.0/vgg_face_weights.h5 -P /root/.deepface/weights/
