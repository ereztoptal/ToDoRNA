from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .models import UserProfile
from .serializers import CreateUserSerializer, UserSerializer
from rest_framework import permissions
from django.http import JsonResponse


class UserCreate(APIView):
    serializer_class = CreateUserSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = User.objects.create_user(username=serializer.validated_data.get('email'),
                                            password=serializer.validated_data.get('password'),
                                            email=serializer.validated_data.get('email'),
                                            first_name=serializer.validated_data.get('first_name'),
                                            last_name=serializer.validated_data.get('last_name'))

            # Create a profile for the new user
            UserProfile.objects.create(user=user)
            return Response({"success": True, "created": True}, status=status.HTTP_201_CREATED)
        return Response({"success": False, "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class UserProfileRetrieve(APIView):
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        serializer = self.serializer_class(request.auth.user.profile)
        return Response(serializer.data, status=status.HTTP_200_OK)
