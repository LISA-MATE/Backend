from django.urls import path

from .views import index, post_create_form_view

app_name = 'boards'

urlpatterns=[
    path('', index, name = 'post-list'),
    path('new/', post_create_form_view, name='post-create'),

    
]