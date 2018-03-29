from rest_framework import permissions


class IsOwner(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        return request.user and request.user.is_authenticated and obj.created_by == request.auth.user
    

class IsListOwner(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        return request.user and request.user.is_authenticated and obj.todo_list.created_by == request.auth.user

