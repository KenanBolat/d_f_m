FROM nginxinc/nginx-unprivileged:1-alpine
LABEL maintainer='Kenan BOLAT'

COPY ./default.conf.tpl /etc/nginx/default.conf.tpl
COPY ./uwsgi_params /etc/nginx/uwsgi_params
COPY ./run.sh /run.sh

ENV LISTEN_PORT=8000

#Can be overriden
ENV APP_HOST=app

#Can be overriden
ENV APP_PORT=9000

#temporary for file creation purposes
USER root

RUN mkdir -p /vol/static && \
    chmod 755 /vol/static && \
    touch /etc/nginx/conf.d/default.conf && \
    chown nginx:nginx /etc/nginx/conf.d/default.conf && \
    chmod 755 /run.sh && \
    apk add gettext && \
    chown nginx:nginx /run.sh

VOLUME /vol/static

# Change to least priviliged user
USER nginx

CMD ["/run.sh"]



