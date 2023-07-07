from django.urls import path

from .views import index, post_create_form_view, information_list_view, review_list_view, hometown_list_view

app_name = 'boards'

urlpatterns=[
    path('', index),
    path('information/', information_list_view, name = 'information-list'),
    path('review/', review_list_view, name = 'review-list'),
    path('hometown/', hometown_list_view, name = 'hometown-list'),
    path('new/', post_create_form_view, name='post-create'), # 게시물 작성 페이지

]