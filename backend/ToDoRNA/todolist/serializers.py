from rest_framework import serializers
from .models import ToDoList, ToDoListItem


class ToDoListSerializer(serializers.ModelSerializer):

    class Meta:
        model = ToDoList
        fields = ('uuid', 'title')
        
        
class ToDoListItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = ToDoListItem
        fields = ('uuid', 'title', 'todo_list')
        read_only_fields = ('todo_list',)
