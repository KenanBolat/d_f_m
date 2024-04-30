FROM python:3.11-slim-bullseye

RUN apt-get update \
  && apt-get install -y --no-install-recommends --no-install-suggests   libhdf5-serial-dev  \
  cron netcdf-bin libnetcdf-dev  git wget build-essential \
  && pip install --no-cache-dir --upgrade pip


ENV CONDA_DIR /opt/conda
RUN wget --quiet https://repo.anaconda.com/miniconda/Miniconda3-py39_23.5.2-0-Linux-x86_64.sh -O ~/miniconda.sh &&  \
  /bin/bash ~/miniconda.sh -b -p /opt/conda


WORKDIR /app



COPY ./requirements.txt /app
COPY ./server.py ./server.py
COPY ./converter.py ./converter.py
COPY ./consumer.py ./consumer.py
COPY ./temp_remover.sh ./temp_remover.sh
COPY ./temp_remover.sh /etc/cron.d/temp_remover
COPY ./initiator.sh ./initiator.sh

# COPY .temp/ /app/temp


ENV PATH=$CONDA_DIR/bin:$PATH

RUN pip install wheel
RUN pip install --no-cache-dir --requirement /app/requirements.txt

RUN chmod +x /app/temp_remover.sh
RUN touch /var/log/cron.log

RUN chmod +x ./initiator.sh

RUN (crontab -l 2>/dev/null ; echo "*/10 * * * * /app/temp_remover.sh >> /var/log/cron.log 2>&1") | crontab -

RUN cron

ENV PYTHONUNBUFFERED=1

EXPOSE 3003

CMD ["bash","initiator.sh"]