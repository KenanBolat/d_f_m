FROM ubuntu:24.04
ENV FTP_USER=foo \
        FTP_PASS=bar \
        GID=1000 \
        UID=1000
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y vsftpd \
    && apt-get install -y openssl \
    && apt-get install -y vim

RUN useradd -m foo && echo "foo:bar" | chpasswd

RUN mkdir -p /home/foo/ftp && chown nobody:nogroup /home/foo/ftp && chmod a-w /home/foo/ftp \
    && mkdir -p /home/foo/ftp/files && chown foo:foo /home/foo/ftp/files

COPY [ "/src/vsftpd.conf", "/etc" ]
COPY [ "/src/docker-entrypoint.sh", "/" ]

ENTRYPOINT [ "/docker-entrypoint.sh" ]
EXPOSE 20/tcp 21/tcp 40000-40009/tcp
HEALTHCHECK CMD netstat -lnt | grep :21 || exit 1