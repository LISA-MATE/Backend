from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    id = models.CharField(verbose_name=id, max_length=20, unique=True, primary_key=True)
    email = models.EmailField(verbose_name='email', unique=True)
    introduction = models.TextField(verbose_name='introduction', default="소개글을 입력하세요.")