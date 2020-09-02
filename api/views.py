from rest_framework.response import Response
from rest_framework import  serializers, viewsets,status
from rest_framework import generics
from rest_framework.views import APIView

from django.http import Http404

from .models import  Task


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

    def create(self, validated_data):

        return Task.objects.create(**validated_data)

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

