from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from .models import Schedule


def index(request): # checklist_view
    user = request.user  # 로그인한 사용자 정보 가져오기
    #schedules = Schedule.objects.filter(writer=user)  # 해당 사용자의 Schedule 객체 필터링
    schedules = Schedule.objects.all()
    
    context = {
        'schedules': schedules
    }

    return render(request, 'checklist/checklist.html', context)

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
        print(duration)
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