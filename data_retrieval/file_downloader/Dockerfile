FROM python:3.11-slim-bullseye

RUN apt-get update \
  && apt-get install -y --no-install-recommends --no-install-suggests git \
  build-essential \
  && pip install --no-cache-dir --upgrade pip

WORKDIR /app

COPY ./requirements.txt /app
COPY ./server.py ./server.py
# COPY .temp/ /app/temp

RUN pip install --no-cache-dir --requirement /app/requirements.txt

COPY ./initiator.sh ./initiator.sh

RUN chmod +x ./initiator.sh

ENV PYTHONUNBUFFERED=1


EXPOSE 3003

CMD ["bash","initiator.sh"]
#CMD ["python", "server.py"]
#CMD ["/bin/bash", "initiator.sh"]

