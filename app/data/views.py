"""
Views for the data APIs.
"""
import os.path

import gridfs
import pymongo
from bson import ObjectId
from django.http import (HttpResponse, JsonResponse)

from drf_spectacular.utils import (
    extend_schema_view,
    extend_schema,
    OpenApiParameter,
    OpenApiTypes
)

from rest_framework import (viewsets, mixins, status)
# mixins is required to add additional functionalities to views

from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from core.models import (Data, Configuration, Mission, Consumed, Event, File)

from . import serializers
# from .serializers import ForeignerSerializer
from django.conf import settings

# import uvicorn
# from deepface import DeepFace
# from .prediction import read_image, preprocess

DOC_ROOT = settings.STATIC_ROOT


class DataViewSet(viewsets.ModelViewSet):
    """View from the manage data APIs."""
    serializer_class = serializers.DataDetailSerializer
    queryset = Data.objects.all()
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

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


class EventViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.EventSerializer
    queryset = Event.objects.all()


class FileViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.FileSerializer
    queryset = File.objects.all()

    @action(detail=True, methods=['get'], url_path='download')
    def download(self, request, pk=None):
        try:
            """Download a file from MongoDB."""
            file = self.get_object()
            mongo_id = file.mongo_id
            file_type = file.file_type

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
