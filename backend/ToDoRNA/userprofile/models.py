from django.db import models
from django.contrib.auth.models import User
import uuid


class UserProfile(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    @property
    def display_name(self):
        return "{first_name} {last_name}".format(first_name=self.user.first_name, last_name=self.user.last_name)


User.profile = property(lambda u: UserProfile.objects.filter(user=u).first())
