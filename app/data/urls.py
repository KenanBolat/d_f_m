"""
URL mappings for the data app.
"""
from django.urls import (
    path,
    include,
)

from rest_framework.routers import DefaultRouter
from data import views
from .views import AOIViewSet


router = DefaultRouter()
router.register('data', views.DataViewSet)
router.register('missions', views.MissionViewSet)
router.register('configuration', views.ConfigurationViewSet)
router.register('events', views.EventViewSet)
router.register('consumer', views.ConsumedViewSet)
router.register('file', views.FileViewSet)
router.register('notifications', views.NotificationViewSet)
router.register(r'upload',views.ImageUploadViewset, basename='image-upload')

router.register(r'aoi', AOIViewSet, basename='aoi')


app_name = 'data'
urlpatterns = [path('', include(router.urls)), ]