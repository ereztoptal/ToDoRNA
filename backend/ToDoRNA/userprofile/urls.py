from django.urls import path
from .views import UserCreate, UserProfileRetrieve


urlpatterns = [
    path('create/', UserCreate.as_view()),
    path('me/', UserProfileRetrieve.as_view()),
]
