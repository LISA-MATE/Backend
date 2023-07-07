from django.contrib.auth.models import AbstractUser, UserManager as DjangoUserManager
from django.db import models

class UserManager(DjangoUserManager):
    def create_user(self, id=None, email=None, password=None, **extra_fields):
        if not id:
            raise ValueError('ID는 필수 값입니다.')
        if not password:
            raise ValueError('비밀번호는 필수 값입니다.')
        if len(password) < 8:
            raise ValueError('비밀번호는 8자 이상이어야 합니다.')

        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        
        return self._create_user(id, email, password, **extra_fields)


class User(AbstractUser):
    objects = UserManager()
    id = models.CharField(max_length=20, unique=True, primary_key=True, verbose_name='ID')
    nickname = models.CharField(max_length=20, default='No nickname')
    image = models.ImageField(verbose_name='이미지', null=True, blank=True)
    introduction = models.TextField(verbose_name='소개글', default="소개글을 입력하세요.")

    def __str__(self):
        return self.id
