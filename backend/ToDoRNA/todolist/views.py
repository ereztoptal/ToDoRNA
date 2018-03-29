from rest_framework import permissions
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.views import APIView
from .models import ToDoList, ToDoListItem
from .serializers import ToDoListItemSerializer, ToDoListSerializer
from .permissions import IsOwner, IsListOwner


class ToDoListCreate(CreateAPIView):
    serializer_class = ToDoListSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class ToDoListEdit(RetrieveUpdateDestroyAPIView):
    serializer_class = ToDoListSerializer
    permission_classes = (IsOwner,)
    queryset = ToDoList.objects.all()
    

class ToDoListList(ListAPIView):
    serializer_class = ToDoListSerializer
    permission_classes = (permissions.IsAuthenticated,)
    queryset = ToDoList.objects.all()
    
    
class ToDoListItemsList(ListAPIView):
    serializer_class = ToDoListItemSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return ToDoList.objects.get(pk=self.kwargs["pk"]).todolistitem_set.all()
    

class ToDoListItemCreate(CreateAPIView):
    serializer_class = ToDoListItemSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(todo_list=ToDoList.objects.get(pk=self.kwargs["pk"]))
        

class ToDoListItemEdit(RetrieveUpdateDestroyAPIView):
    serializer_class = ToDoListItemSerializer
    permission_classes = (IsListOwner,)
    queryset = ToDoListItem.objects.all()

