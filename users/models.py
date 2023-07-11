from django.contrib.auth.models import AbstractUser, UserManager as DjangoUserManager
from django.db import models

class UserManager(DjangoUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('이메일은 필수 값입니다.')
        if not password:
            raise ValueError('비밀번호는 필수 값입니다.')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('username', email)  # username 값을 email로 설정
        return self.create_user(email, password, **extra_fields)

class User(AbstractUser):
    email = models.EmailField(unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nickname']
    nickname = models.CharField(verbose_name='닉네임', max_length=255, default='아기사자 33')
    image = models.ImageField(verbose_name='이미지', upload_to='image/', null=True, blank=True)
    introduction = models.TextField(verbose_name='소개글', default="이사 준비 중입니다!")
    objects = UserManager()

    def __str__(self):
        return self.email