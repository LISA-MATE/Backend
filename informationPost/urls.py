from django.urls import path

from .views import index, post_create_form_view, board_list_view, board_topic_list_view, post_detail_view, post_update_view, post_delete_view, create_comment_view

app_name = 'boards'

urlpatterns=[
    path('', index),
    path('new/', post_create_form_view, name='post-create'),  # 게시물 작성 페이지
    path('<int:id>/delete/', post_delete_view, name='post-delete'),
    path('<str:board_type>/<str:topic>/<int:id>/edit/', post_update_view, name='post-update'),
    path('create_comment/<int:post_id>/', create_comment_view, name='create-comment'),
    path('<str:board_type>/<str:topic>/<int:id>/', post_detail_view, name='board-topic-detail'),
    path('<str:board_type>/<str:topic>/', board_topic_list_view, name='board-topic-list'),
    path('<str:board_type>/', board_list_view, name='board-list'),
]
