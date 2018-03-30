from rest_framework import serializers
from .models import ToDoList, ToDoListItem


class JSONSerializerField(serializers.Field):
    """ Serializer for JSONField -- required to make field writable"""
    def to_internal_value(self, data):
        return data
    
    def to_representation(self, value):
        return value


class ToDoListItemSerializer(serializers.ModelSerializer):
    contact = JSONSerializerField()
    photo = JSONSerializerField()

    class Meta:
        model = ToDoListItem
        fields = ('uuid', 'title', 'contact', 'photo', 'description', 'todo_list')
        read_only_fields = ('todo_list',)


class ToDoListSerializer(serializers.ModelSerializer):
    items = ToDoListItemSerializer(read_only=True, many=True)

    class Meta:
        model = ToDoList
        fields = ('uuid', 'title', 'items')
        

