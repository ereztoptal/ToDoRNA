from django.db import models
import uuid
from django.contrib.auth.models import User


class ToDoList(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    creation_date = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=255)


class ToDoListItem(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True)
    todo_list = models.ForeignKey(ToDoList, on_delete=models.CASCADE)
    creation_date = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=255)
    # TODO: add attachments (image, contact)