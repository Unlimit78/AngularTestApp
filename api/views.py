from rest_framework.response import Response
from rest_framework import  serializers, viewsets
from rest_framework import generics
from .models import  Task


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

    def create(self, validated_data):

        return Task.objects.create(**validated_data)



class TaskList(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    def list(self, request):
        # Note the use of `get_queryset()` instead of `self.queryset`
        queryset = self.get_queryset()
        serializer = TaskSerializer(queryset, many=True)
        return Response(serializer.data)
