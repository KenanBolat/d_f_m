FROM python:3.10.10-buster
ENV FTP_USER=foo \
        FTP_PASS=bar \
        GID=1000 \
        UID=1000
ENV DEBIAN_FRONTEND=noninteractive


COPY ./src/requirements.txt /tmp/requirements.txt
COPY ./src /src

RUN apt-get update && apt-get install -y vsftpd \
    && apt-get install -y openssl python3 python3-pip python3-venv \
    && apt-get install -y vim \
    && apt-get install -y net-tools \
    && apt-get install -y iputils-ping \
    && python3 -m venv /py \
    && /py/bin/pip install --upgrade pip \
    && /py/bin/pip install -r /tmp/requirements.txt

ENV PATH="/scripts:/py/bin:$PATH"


RUN useradd -m foo && echo "foo:bar" | chpasswd

RUN mkdir -p /home/foo/ftp && chown nobody:nogroup /home/foo/ftp && chmod a-w /home/foo/ftp \
    && mkdir -p /home/foo/ftp/files && chown foo:foo /home/foo/ftp/files

COPY [ "/src/vsftpd.conf", "/etc" ]
COPY [ "/src/docker-entrypoint.sh", "/" ]

ENTRYPOINT [ "/docker-entrypoint.sh" ]
EXPOSE 20/tcp 21/tcp 40000-40009/tcp
HEALTHCHECK CMD netstat -lnt | grep :21 || exit 1