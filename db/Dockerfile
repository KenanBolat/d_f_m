FROM postgres:13

RUN apt-get update && apt-get  install -y postgresql-13-postgis-3

CMD ["/usr/local/bin/docker-entrypoint.sh","postgres"]