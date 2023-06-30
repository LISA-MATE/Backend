from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    id = models.CharField(verbose_name='id', max_length=20, primary_key=True)