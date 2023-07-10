from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from .models import Schedule


def index(request):
    return render(request, 'checklist/checklist.html')

def calendar_view(request):
    return render(request, 'checklist/cal.html')

@csrf_exempt
def create_schedule_view(request):
    if request.method == 'POST':
        content = request.POST.get('content')
        year = request.POST.get('year')
        month = request.POST.get('month')
        day = request.POST.get('day')
        duration = request.POST.get('duration')

        # Schedule 모델에 새로운 객체 생성 및 저장
        schedule = Schedule(
            content=content,
            date=f"{year}-{month}-{day}",
            duration=duration
        )
        schedule.save()

        return JsonResponse({'success': True})
    else:
        return JsonResponse({'success': False, 'message': 'Invalid request method'})