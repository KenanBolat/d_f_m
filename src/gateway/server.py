import os, gridfs, pika, json
from flask import Flask, request, send_file
from flask_pymongo import PyMongo
from auth import validate
from auth_svc import access
from storage import util
from bson.objectid import ObjectId

server = Flask(__name__)
#
# mongo_data = PyMongo(server, uri="mongodb://host.minikube.internal:27017/data")
# mongo_netcdf = PyMongo(server, uri="mongodb://host.minikube.internal:27017/netcdf")
# mongo_png = PyMongo(server, uri="mongodb://host.minikube.internal:27017/png")
# mongo_geotiff = PyMongo(server, uri="mongodb://host.minikube.internal:27017/geo_tiff")
#

mongo_data = PyMongo(server, uri="mongodb://localhost:27017/data")
mongo_netcdf = PyMongo(server, uri="mongodb://localhost:27017/ncdf")
mongo_png = PyMongo(server, uri="mongodb://localhost:27017/png")
mongo_geotiff = PyMongo(server, uri="mongodb://localhost:27017/geo_tiff")

fs_data = gridfs.GridFS(mongo_data.db)
fs_netcdf = gridfs.GridFS(mongo_netcdf.db)
fs_png = gridfs.GridFS(mongo_png.db)
fs_geotiff = gridfs.GridFS(mongo_geotiff.db)


# connection = pika.BlockingConnection(pika.ConnectionParameters("rabbitmq"))
connection = pika.BlockingConnection(pika.URLParameters('amqp://guest:guest@localhost:5672/'))
channel = connection.channel()


@server.route("/login", methods=["POST"])
def login():
    token, err = access.login(request)

    if not err:
        print(err)
        return token
    else:
        return err


@server.route("/upload", methods=["POST"])
def upload():
    print("="*50)
    print("="*50)
    print(request.files)
    print(request.headers)
    access, err = validate.token(request)

    if err:
        print(err)
        return err

    access = json.loads(access)
    print(access)
    if access["admin"]:
        if len(request.files) > 1 or len(request.files) < 1:
            return "exactly 1 file required", 400

        for _, f in request.files.items():
            err = util.upload(f, fs_data, channel, access)

            if err:
                print(err)
                return err

        return "success!", 200
    else:
        return "not authorized", 401


@server.route("/download", methods=["GET"])
def download():
    access, err = validate.token(request)

    if err:
        return err

    access = json.loads(access)

    if access["admin"]:
        fid_string = request.args.get("fid")

        if not fid_string:
            return "fid is required", 400

        try:
            out = fs_netcdf.get(ObjectId(fid_string))
            return send_file(out, download_name=f"{fid_string}.mp3")
        except Exception as err:
            print(err)
            return "internal server error", 500

    return "not authorized", 401


if __name__ == "__main__":
    server.run(host="0.0.0.0", port=8080, threaded=False)
