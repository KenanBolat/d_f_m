FROM python:3.11-slim-bullseye

RUN apt-get update \
  && apt-get install -y --no-install-recommends --no-install-suggests   libhdf5-serial-dev  \
    netcdf-bin libnetcdf-dev  git wget build-essential \
  && pip install --no-cache-dir --upgrade pip


ENV CONDA_DIR /opt/conda
RUN wget --quiet https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O ~/miniconda.sh &&  \
    /bin/bash ~/miniconda.sh -b -p /opt/conda


WORKDIR /app



COPY ./requirements.txt /app
COPY ./server.py ./server.py
# COPY .temp/ /app/temp

RUN pip install --no-cache-dir --requirement /app/requirements.txt
ENV PATH=$CONDA_DIR/bin:$PATH

COPY ./initiator.sh ./initiator.sh

RUN chmod +x ./initiator.sh

ENV PYTHONUNBUFFERED=1


EXPOSE 3003

CMD ["bash","initiator.sh"]
#CMD ["python", "server.py"]
#CMD ["/bin/bash", "initiator.sh"]

