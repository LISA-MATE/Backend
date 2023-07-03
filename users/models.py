from django.contrib.auth.models import AbstractUser, UserManager as DjangoUserManager
from django.db import models

class UserManager(DjangoUserManager):
    def create_user(self, username=None, email=None, password=None, **extra_fields):
        if not username:
            raise ValueError('ID는 필수 값입니다.')
        if not password:
            raise ValueError('비밀번호는 필수 값입니다.')
        if len(password) < 8:
            raise ValueError('비밀번호는 8자 이상이어야 합니다.')

        return self._create_user(username, email, password, **extra_fields)


class User(AbstractUser):
    objects = UserManager()
    image = models.ImageField(verbose_name='이미지', null=True, blank=True)
    introduction = models.TextField(verbose_name='소개글', default="소개글을 입력하세요.")
