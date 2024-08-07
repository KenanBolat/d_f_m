#!/bin/sh

addgroup \
        -g $GID \
        -S \
        $FTP_USER

adduser \
        -D \
        -G $FTP_USER \
        -h /home/$FTP_USER \
        -s /bin/false \
        -u $UID \
        $FTP_USER

mkdir -p /home/$FTP_USER
mkdir -p /var/run/vsftpd/empty
chown -R $FTP_USER:$FTP_USER /home/$FTP_USER
chown -R $FTP_USER:$FTP_USER /data
chmod -R 777 /data

echo "$FTP_USER:$FTP_PASS" | /usr/sbin/chpasswd


touch /var/log/vsftpd.log
tail -f /var/log/vsftpd.log | tee /dev/stdout &
touch /var/log/xferlog
tail -f /var/log/xferlog | tee /dev/stdout &

/py/bin/python3 /src/watcher.py &
/usr/sbin/vsftpd
