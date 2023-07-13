from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Schedule(models.Model):
    content = models.TextField(verbose_name='작성 내용')
    date = models.DateField(verbose_name='날짜') # date(2023,6,15)
    duration = models.CharField(
        verbose_name='기간',
        choices=(
            ('before', '이사 전'),
            ('doing', '이사 중'),
            ('done', '이사 후'),
        ),
        max_length=10
    )
    created_at = models.DateTimeField(verbose_name='작성일', auto_now_add=True)
    writer = models.ForeignKey(to=User, on_delete=models.CASCADE, null=True, blank=True)
    is_checked = models.BooleanField(verbose_name='체크 여부', default=False)

    def __str__(self):
        return self.content
    