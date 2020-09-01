from django.urls import path,include
from rest_framework import routers


from .views import TaskList,TaskDetail





urlpatterns = [
    path('', TaskList.as_view(), name='task-list'),
    path('<int:pk>',TaskDetail.as_view(),name='task-detail')
]