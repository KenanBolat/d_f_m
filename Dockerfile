FROM python:3.9
LABEL maintainer='Kenan BOLAT'

ENV PYTHONUNBUFFERED 1
COPY ./requirements.txt /tmp/requirements.txt
COPY ./requirements.dev.txt /tmp/requirements.dev.txt
COPY ./app/sqlite3.db /app/sqlite3.db
COPY ./scripts/run.sh /scripts/run.sh
COPY ./app /app
WORKDIR /app
EXPOSE 8000

ARG DEV=false
RUN python -m venv /py && \
    /py/bin/pip install --upgrade pip && \
    apt-get update && apt-get install libgl1 libpq-dev python-dev-is-python3 -y && \
    /py/bin/pip install -r /tmp/requirements.txt && \
    rm -rf /tmp && \
    adduser \
        --disabled-password \
        django-user && \
    mkdir -p /vol/web/media && \
    mkdir -p /vol/web/static && \
    chown -R django-user:django-user /vol/* && \
    chmod -R 755 /vol && \
    chmod -R +x /scripts/* && \
    chown -R django-user:django-user /scripts/*
#


ENV PATH="/scripts:/py/bin:$PATH"

USER django-user

CMD ["run.sh"]