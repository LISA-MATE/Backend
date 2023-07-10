from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from users.models import User

class UsersAdmin(admin.ModelAdmin):
    list_display = ('id', 'nickname', 'email', 'image', 'introduction')
    fields = ('nickname', 'email', 'password')

admin.site.register(User, UsersAdmin)