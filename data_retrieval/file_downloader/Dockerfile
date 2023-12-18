FROM python:3.11-slim-bullseye

RUN apt-get update \
  && apt-get install -y --no-install-recommends --no-install-suggests git \
  build-essential \
  && pip install --no-cache-dir --upgrade pip \
    && git clone  http://gitserver:3000/kenan/dataconverter.git \
    && cd dataconverter \
    && python setup.py install

WORKDIR /app
COPY ./requirements.txt /app
COPY ./server.py ./server.py
RUN pip install --no-cache-dir --requirement /app/requirements.txt

ENV PYTHONUNBUFFERED=1


EXPOSE 3003

#CMD ["bash","initiator.sh"]
#CMD ["python", "server.py"]
CMD ["python", "server.py"]

