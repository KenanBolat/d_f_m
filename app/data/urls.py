"""
URL mappings for the data app.
"""
from django.urls import (
    path,
    include,
)

from rest_framework.routers import DefaultRouter
from data import views

router = DefaultRouter()
router.register('data', views.DataViewSet)

app_name = 'data'
urlpatterns = [path('', include(router.urls)), ]