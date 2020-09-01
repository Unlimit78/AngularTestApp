from django.urls import path,include
from rest_framework import routers


from .views import TaskList





urlpatterns = [
    path('', TaskList.as_view(), name='task-list'),
]