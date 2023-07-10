from django.urls import path

from .views import index, create_schedule_view, calendar_view

app_name = 'checklist'

urlpatterns = [
    path('', index, name='index'),
    path('calendar/', calendar_view, name='calendar'),
    path('create_schedule/', create_schedule_view, name='schedule-create'),
]