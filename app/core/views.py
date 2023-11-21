"""
Core views for app.
"""
import io
import os
import uuid
from io import BytesIO

# from deepface import DeepFace
from rest_framework.decorators import api_view
from rest_framework.response import Response
from drf_spectacular.utils import (
    extend_schema_view,
    extend_schema,
    OpenApiTypes,
)
# from data.prediction import read_image, preprocess
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.conf import settings


from rest_framework import serializers


def faceid_image_file_path(filename):
    """Generate file path for new data image."""
    ext = os.path.splitext(filename)[1]
    filename = f'{uuid.uuid4()}{ext}'

    return os.path.join('uploads', 'data', filename)


class Compare(object):
    def __init__(self, image1, image2):
        self.image1 = image2
        self.image2 = image2


# create a serializer
class CompareSerializer(serializers.Serializer):
    # initialize fields
    image1 = serializers.ImageField()
    image2 = serializers.ImageField()


@extend_schema_view(
    post=extend_schema(description='post desc', request=CompareSerializer, responses=OpenApiTypes.UUID),
)
@api_view(['POST'])
def compare_view(request):
    """Gets two separate image and  compares them."""
    print(request.FILES)

    # c = Compare.objects.all()
    # s = CompareSerializer(c, many=True)
    # print("==" * 5)
    # img1 = "/vol/web/media/uploads/data/" + s.data[0]['image'].split('/')[-1]
    # imgRead1 = read_image(img1)

    print("==" * 5)

    path = default_storage.save('tmp/img1.png', ContentFile(request.FILES["image1"].read()))
    tmp_file1 = os.path.join(settings.MEDIA_ROOT, path)
    path2 = default_storage.save('tmp/img2.png', ContentFile(request.FILES["image2"].read()))
    tmp_file2 = os.path.join(settings.MEDIA_ROOT, path2)
    print(tmp_file1)
    print(tmp_file2)
    # imgRead1 = read_image(tmp_file1)
    # imgRead2 = read_image(tmp_file2)
    # preprocess1 = preprocess(imgRead1)
    # preprocess2 = preprocess(imgRead2)
    # model_name = 'VGG-Face'
    # result = DeepFace.verify(img1_path=preprocess1, img2_path=preprocess2, model_name=model_name)

    #
    # print(img1)
    #
    # with io.BytesIO() as output:
    #     img1.save(output, format="PNG")
    #     contents = output.getvalue()
    # image1 = preprocess(read_image(img1))
    # image2 = preprocess(read_image(BytesIO(request.FILES["image2"].read())))
    # result = DeepFace.verify(img1_path=image1, img2_path=image2, model_name=model_name)

    return Response(None)


@api_view(['GET'])
def health_check(request):
    """Returns successful response."""
    return Response({'healthy': True})
