from django.urls import path,include
from rest_framework import routers


from .views import TaskViewSet,CategoryViewSet





urlpatterns = [
    path('api/task/', TaskViewSet.as_view({
                                        'get': 'list',
                                        'post': 'create'
                                    }), name='task-list'),

    path('api/task/<int:pk>/',TaskViewSet.as_view({'get': 'retrieve',
                                    'put': 'update',
                                    'patch': 'partial_update',
                                    'delete': 'destroy'}),name='task-detail'),

    path('api/category/', CategoryViewSet.as_view({
        'get': 'list',
        'post': 'create'
    }), name='category-list'),

    path('api/category/<int:pk>/', CategoryViewSet.as_view({'get': 'retrieve',
                                                    'put': 'update',
                                                    'patch': 'partial_update',
                                                    'delete': 'destroy'}), name='category-detail')
]

