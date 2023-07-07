from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

class UserModelAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'username', 'image', 'introduction')
    fields = ('username', 'email', 'password')
    
admin.site.register(User, UserModelAdmin)