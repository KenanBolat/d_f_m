"""
Views for the data APIs.
"""
from io import BytesIO

import os
import zipfile
import shutil
import httpx
import requests

from urllib.parse import urljoin

import os.path
from django.db import connection

import gridfs
import pymongo
from bson import ObjectId
from django.http import (HttpResponse, JsonResponse)
from datetime import datetime
from rest_framework.exceptions import NotFound
from rest_framework.decorators import api_view
from rest_framework.test import APIRequestFactory


from django.db.models import Func, Value

from drf_spectacular.utils import (
    extend_schema_view,
    extend_schema,
    OpenApiParameter,
    OpenApiTypes
)

from dateutil.parser import parse as parse_datetime

from .serializers import FileSerializer

from rest_framework import (viewsets, mixins, status)
# mixins is required to add additional functionalities to views

from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.db.models import (Count, Sum, FloatField, F, Q)
from django.db.models.functions import Cast, Round

from core.models import (Data,
                         Configuration,
                         Mission,
                         Consumed,
                         Event,
                         File,
                         Notification)

from . import serializers
from .serializers import GeoserverDataSourceSerializer

# from .serializers import ForeignerSerializer
from django.conf import settings

from django.db import connection


class AOIViewSet(viewsets.ViewSet):

    def list(self, request):
        """Fetch the most recent data from AOI table filtered by mission and channel."""
        mission = request.query_params.get('mission')
        channel = request.query_params.get('channel')
        print(request.query_params)

        if not mission or not channel:
            return Response({"error": "Mission and Channel parameters are required."}, status=400)

        with connection.cursor() as cursor:
            cursor.execute('''
                SELECT * FROM public.aoi 
                WHERE mission = %s AND channel = %s
                ORDER BY ingestion DESC 
                LIMIT 1;
            ''', [mission, channel])
            row = cursor.fetchone()
            if row:
                columns = [col[0] for col in cursor.description]
                result = dict(zip(columns, row))
                return Response(result)
            else:
                return Response({"error": "No data found for the specified mission and channel."}, status=404)


# import uvicorn
# from deepface import DeepFace
# from .prediction import read_image, preprocess

DOC_ROOT = settings.STATIC_ROOT


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)

        # Add custom claims
        token['user_name'] = user.name
        token['user_email'] = user.email
        token['su'] = int(user.is_superuser)
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class DataViewSet(viewsets.ModelViewSet):
    """View from the manage data APIs."""
    queryset = Data.objects.all().prefetch_related('converted_files')
    serializer_class = serializers.DataSerializer
    # Authentication and permissions

    # In order to download the file, the user must be authenticated and have the permission to download the file
    authentication_classes = [TokenAuthentication, JWTAuthentication, ]
    permission_classes = [IsAuthenticated]

    # Trial and Error
    # serializer_class = serializers.DataDetailSerializer
    # lookup_field = 'satellite_mission__satellite_mission'
    # profile_serializer = serializers.ForeignerSerializer

    def _params_to_ints(self, qs):
        """Convert a list of strings to integers."""
        # 1,2,3
        return [int(str_id) for str_id in qs.split(',')]

    def get_queryset(self):
        """Retrieve data for authenticated user."""
        queryset = Data.objects.all()
        satellite_mission = self.request.query_params.get('satellite_mission', None)
        date_tag = self.request.query_params.get('date_tag', None)
        status = self.request.query_params.get('status', None)
        if satellite_mission:
            queryset = queryset.filter(satellite_mission__satellite_mission=satellite_mission).order_by('-id')
        if date_tag:
            queryset = queryset.filter(date_tag=date_tag).order_by('-id')
        if status:
            queryset = queryset.filter(status=status).order_by('-id')
        return queryset

    def get_serializer_class(self):
        """Return the serializer class for request."""
        if self.action == 'list':
            return serializers.DataSerializer
        elif self.action == 'upload_image':
            return serializers.DataImageSerializer

        return self.serializer_class

    def perform_create(self, serializer):
        """create a new data."""
        serializer.save(user=self.request.user)

    @action(methods=['POST'], detail=True, url_path='upload_image')
    def upload_image(self, request, pk=None):
        """Upload an image to data."""
        faceid = self.get_object()
        print(self.request.user)
        print(self.request.user.name)

        profile = Data.objects.all()
        p = profile.filter(user=self.request.user).order_by('-id')
        s = ForeignerSerializer(p, many=True)
        img1 = "/vol/web/media/uploads/data/" + s.data[0]['image'].split('/')[-1]

        print(img1)
        print("==" * 5)
        serializers = self.get_serializer(faceid, data=request.data)

        if serializers.is_valid():
            serializers.save()
            return Response(None, status=status.HTTP_200_OK)

        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)


class ConfigurationViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.ConfigurationSerializer
    queryset = Configuration.objects.all()
    lookup_field = 'satellite_mission__satellite_mission'


class MissionViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.MissionSerializer
    queryset = Mission.objects.all()


class ConsumedViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.ConsumedMessageSerializer
    queryset = Consumed.objects.all()


class NotificationViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.NotificationSerializer
    queryset = Notification.objects.all()


class EventViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.EventSerializer
    queryset = Event.objects.all()
    lookup_field = 'message_id'

    def get_queryset(self):
        """Retrieve data for authenticated user."""
        queryset = Event.objects.all()
        message_id = self.request.query_params.get('message_id', None)
        if message_id:
            queryset = queryset.filter(message_id=message_id).order_by('-id')
        return queryset


class FileViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.FileSerializer
    queryset = File.objects.all()

    from django.http import HttpResponse
    import pymongo
    import gridfs
    from bson.objectid import ObjectId

    class ToTimestamp(Func):
        function = 'TO_TIMESTAMP'
        template = "%(function)s(%(expressions)s, 'YYYYMMDDHHMI')"

    @action(detail=True, methods=['get'], url_path='image')
    def serve_image(self, request, pk=None):
        """Serve an image file from MongoDB for display."""
        file = self.get_object()
        mongo_id = file.mongo_id
        file_type = file.file_type  # This should ideally indicate a database or a collection

        if not mongo_id:
            return Response({"message": "No MongoDB ID provided for file."}, status=status.HTTP_400_BAD_REQUEST)

        client = pymongo.MongoClient(os.environ.get('MONGO_HOST', 'localhost'), 27017)
        db = client[file_type]
        fs = gridfs.GridFS(db)

        try:
            file_data = fs.get(ObjectId(mongo_id))
            return HttpResponse(file_data.read(), content_type='image/png')
        except Exception as e:
            return Response({"message": "File not found in MongoDB"}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['get'], url_path='download')
    def download(self, request, pk=None):
        try:
            """Download a file from MongoDB."""
            file = self.get_object()
            mongo_id = file.mongo_id
            file_type = file.file_type
            print("tirlasldalsd*"*100)

            if not mongo_id:
                return Response({"message": "No MongoDB ID provided for file."}, status=status.HTTP_400_BAD_REQUEST)

            print(mongo_id)

            # Connect to your MongoDB
            # client = pymongo.MongoClient("mongodb://mongodb:27017")
            client = pymongo.MongoClient(os.environ.get('MONGO_HOST', 'localhost'), 27017)
            db = client[file_type]
            fs = gridfs.GridFS(db)

            # Retrieve the file data using mongo_id
            # file_data = collection.find_one({'_id': ObjectId(mongo_id)})
            file_data = fs.get(ObjectId(mongo_id))
            if not file_data:
                return Response({"message": "File not found in MongoDB"}, status=status.HTTP_404_NOT_FOUND)

            # Assuming the file's content is stored under a key 'content'
            # response = FileResponse(file_data.read(), as_attachment=True, filename=file.file_name)
            response = HttpResponse(file_data.read(), content_type='application/octet-stream')
            response['Content-Disposition'] = f'attachment; filename="{file.file_name}"'
            return response
        except Exception as e:
            # Log the error here if necessary
            return Response({"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=True, methods=['post'], url_path='delete')
    def delete(self, request, pk=None):
        """Delete a file from MongoDB."""
        file = self.get_object()
        mongo_id = file.mongo_id
        file_type = file.file_type

        if not mongo_id:
            # return Response({"message": "No MongoDB ID provided for file."}, status=status.HTTP_400_BAD_REQUEST)
            return JsonResponse({"message": "No MongoDB ID provided for file."}, status=status.HTTP_400_BAD_REQUEST)

        # Connect to your MongoDB
        # client = pymongo.MongoClient("mongodb://mongodb:27017")
        client = pymongo.MongoClient(os.environ.get('MONGO_HOST', 'localhost'), 27017)
        db = client[file_type]
        fs = gridfs.GridFS(db)

        # Retrieve the file data using mongo_id
        # file_data = collection.find_one({'_id': ObjectId(mongo_id)})
        file_data = fs.get(ObjectId(mongo_id))
        if not file_data:
            return Response({"message": "File not found in MongoDB"}, status=status.HTTP_404_NOT_FOUND)

        # Delete the file from MongoDB
        fs.delete(ObjectId(mongo_id))

        # Delete the file from the database
        file.delete()

        return JsonResponse({'status': 'success', 'message': 'File deleted successfully.'})

    @action(detail=False, methods=['get'], url_path='summary')
    def file_summary(self, request):
        file_summary = (
            File.objects
            .annotate(satellite_mission=F('data__satellite_mission__satellite_mission'))
            .values('satellite_mission', 'file_type')
            .annotate(
                total_count=Count('id'),
                total_file_size=Round(Sum(Cast('file_size', FloatField())) / (1024.0 ** 3), precision=2)
            )
            .order_by('data__satellite_mission__satellite_mission', 'file_type')
        )

        # You can directly return the data, but using a serializer is a good practice
        # if you want to ensure a consistent format or add additional processing
        print(file_summary)
        return Response(file_summary)

    @action(detail=False, methods=['get'], url_path='special-query')
    def special_query(self, request):
        satellite_mission = request.query_params.get('satellite_mission', '')
        # channel = request.query_params.get('channel', 'IR_120')
        channel = request.query_params.get('channel', '')
        file_type = request.query_params.get('file_type', '.png')
        start_date = request.query_params.get('start_date', '2000-05-21T19:49:44.034Z')  # '2000-12-31 23:59:59'
        end_date = request.query_params.get('end_date', datetime.max)  # '9999-12-31 23:59:59'

        # Ensure dates are in the correct format
        try:
            start_date = parse_datetime(start_date)
            # end_date = datetime.strptime(end_date, '%Y-%m-%d %H:%M:%S')
        except ValueError:
            return Response({'error': 'Invalid date format. Use YYYY-MM-DD HH:MM:SS'}, status=400)

        files = ((File.objects
                  .annotate(file_datetime=self.ToTimestamp(F('file_date'))))
                 .filter(
            Q(file_name__contains=satellite_mission) &
            Q(file_name__contains=channel) &
            Q(file_name__endswith=file_type) &
            Q(file_datetime__range=[start_date, end_date])
        ).order_by('file_date'))
        print(files)
        print(f"{satellite_mission}")
        print(start_date.strftime('%Y%m%d%H%M'))
        serializer = FileSerializer(files, many=True)

        return Response(serializer.data)


# class GeoserverDataSourceSerializerViewSet(viewsets.ModelViewSet):
#     serializer_class = serializers.FileSerializer
#     queryset = File.objects.all()


@api_view(['GET'])
def get_geoserver_data(request):
    # Define the raw SQL query (including the union)
    query = """
select foo.fid , foo.location, foo.ingestion, foo.mission, foo.channel, foo.coverage, cf.id , cf.file_name, cf.created_at, cf.file_size  from (
SELECT *, (split_part(location, '.tif', 1 ) || '.png') as loc , 'aoi' as coverage FROM aoi
UNION
SELECT *, (split_part(location, '.tif', 1 ) || '.png') as loc ,'rgb' as coverage FROM rgb
UNION
SELECT *, (split_part(location, '.tif', 1 ) || '.png') as loc , 'cloud' as coverage FROM cloud  ) as foo 
left join core_file cf on foo.loc =  cf.file_name; 
"""

    with connection.cursor() as cursor:
        cursor.execute(query)
        results = cursor.fetchall()

    # Prepare the data for serialization
    combined_data = []
    for row in results:

        combined_data.append({
            'id': row[0],  # ID field
            'layername': row[5] if len(row) > 5 else None,
            'channel': row[4] if len(row) > 4 else None,
            'mission': row[3] if len(row) > 3 else None,
            'time': f'{row[2].strftime("%Y-%m-%dT%H:%M:%S.000Z")}' if len(row) > 2 else None,
            'downloadid': f'/api/file/{row[6]}/download/' if len(row) > 6 else None,
            'filename': row[7] if len(row) > 7 else None,
            'created_at': f'{row[8].strftime("%Y-%m-%dT%H:%M:%S.000Z")}' if len(row) > 8 else None,
            'file_size': row[9] if len(row) > 9 else None,
        })

    # Serialize the combined data
    serializer = GeoserverDataSourceSerializer(combined_data, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def create_zip(request):
    files = request.data.get('links', [])
    print(files)
    # Extract the file links and names from the request
    files = request.data.get('links', [])
    if not files:
        return JsonResponse({'error': 'No links provided'}, status=400)

        # Create a temporary directory to download files

    factory = APIRequestFactory()

    # Create an async client for HTTP requests
    # zip_file_path = os.path.join(settings.MEDIA_ROOT, 'zipped_files.zip')
    zip_file_path = BytesIO()
    with zipfile.ZipFile(zip_file_path, 'w') as zipf:
        for file_info in files:
            link = file_info.get('link')
            file_name = file_info.get('fileName')
            # /api/file/1707/download/
            request = factory.get(link)
            pk = link.split('/')[3]

            view = FileViewSet.as_view({'get': 'download'})
            file_response = view(request, pk=pk)

            if file_response.status_code == 200:

                # Make sure the buffer is set at the beginning of the stream
                temp_dir = os.path.join(settings.MEDIA_ROOT, 'temp_downloads')
                os.makedirs(temp_dir, exist_ok=True)
                temp_file_path = os.path.join(temp_dir, file_name)


                with open(temp_file_path, 'wb') as f:
                    f.write(file_response.content)
                zipf.write(temp_file_path, arcname=file_name)
                # zipf.writestr(file_name, file_response.content)
                print('zipf'*100, temp_file_path)
                print('ok'*100)
                # Make sure the buffer is set at the beginning of the stream
    zip_file_path.seek(0)

    # Create an HTTP response with the zip file
    response = HttpResponse(zip_file_path, content_type='application/zip')
    response['Content-Disposition'] = 'attachment; filename=zipped_files.zip'

    return response
