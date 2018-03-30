from django.db import models
import uuid
from django.contrib.auth.models import User
from jsonfield import JSONField


class ToDoList(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    creation_date = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=255)
    
    @property
    def items(self):
        return self.todolistitem_set.all()


class ToDoListItem(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True)
    todo_list = models.ForeignKey(ToDoList, on_delete=models.CASCADE)
    creation_date = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=255)
    contact = JSONField(null=True, blank=True)
    photo = JSONField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
