from django.urls import path

from .views import index, create_schedule_view, calendar_view, get_schedule_view, update_schedule_view, delete_schedule_view

app_name = 'checklist'

urlpatterns = [
    path('', index, name='index'),
    path('calendar/', calendar_view, name='calendar'),
    path('create_schedule/', create_schedule_view, name='schedule-create'),
    path('calendar/get_schedule/', get_schedule_view, name='schedule-get'),
    path('edit/<int:id>/', update_schedule_view, name='schedule-update'),
    path('delete/<int:id>/', delete_schedule_view, name='schedule-delete'),

]