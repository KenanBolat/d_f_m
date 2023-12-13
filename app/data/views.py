"""
Views for the data APIs.
"""
import os.path

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

from core.models import (Data, Configuration, Mission, Consumed, Event, )

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
        print("==" * 5)
        img1 = "/vol/web/media/uploads/data/" + s.data[0]['image'].split('/')[-1]
        # imgRead1 = read_image(img1)

        print(img1)
        print("==" * 5)
        # imgRead1 = read_image(img1.read())
        # print(imgRead1)
        serializers = self.get_serializer(faceid, data=request.data)

        if serializers.is_valid():
            serializers.save()

            print("==" * 3)
            img2 = os.path.join("/vol/web/media/uploads/data/", serializers.data['image'].split('/')[-1])
            # imgRead2 = read_image(img2)
            # print(img2)
            # print("==" * 3)
            # preprocess1 = preprocess(imgRead1)
            # preprocess2 = preprocess(imgRead2)
            # model_name = 'VGG-Face'
            # print(model_name)
            # result = DeepFace.verify(img1_path=preprocess1, img2_path=preprocess2, model_name=model_name)
            # print(str(result))
            # return Response(result, status=status.HTTP_200_OK)
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
