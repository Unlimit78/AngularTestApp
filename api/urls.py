from django.urls import path,include
from rest_framework import routers


from .views import TaskViewSet





urlpatterns = [
    path('api/', TaskViewSet.as_view({
                                        'get': 'list',
                                        'post': 'create'
                                    }), name='task-list'),

    path('api/<int:pk>/',TaskViewSet.as_view({'get': 'retrieve',
                                    'put': 'update',
                                    'patch': 'partial_update',
                                    'delete': 'destroy'}),name='task-detail')
]

