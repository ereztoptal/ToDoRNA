from django.urls import path, re_path
from .views import ToDoListEdit, ToDoListItemEdit, ToDoListCreate, ToDoListList, ToDoListItemsList, ToDoListItemCreate


urlpatterns = [
    path('create/', ToDoListCreate.as_view()),
    re_path(r'^(?P<pk>[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12})/$', ToDoListEdit.as_view()),
    re_path(r'^(?P<pk>[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12})/items/$', ToDoListItemsList.as_view()),
    re_path(r'^(?P<pk>[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12})/items/create/$', ToDoListItemCreate.as_view()),
    re_path('items/(?P<pk>[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12})/$', ToDoListItemEdit.as_view()),
    path('', ToDoListList.as_view()),
]
