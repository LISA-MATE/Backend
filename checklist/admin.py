from django.contrib import admin
from .models import Schedule


@admin.register(Schedule)
class PostModelAdmin(admin.ModelAdmin):
    # 기타 설정 생략
    list_display = ('id', 'is_checked', 'content', 'date', 'duration', 'created_at', 'writer')
