from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

class UserModelAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'nickname', 'image', 'introduction')
    fields = ('id', 'email', 'password')
    
admin.site.register(User, UserModelAdmin)