from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render, redirect
from .models import Schedule
from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required
from datetime import date, datetime
from django.db.models import Q

def index(request):
    if not request.user.is_authenticated:
        return redirect('accounts:login')  # 로그인 페이지로 리디렉션

    # 작성자가 None이거나 현재 로그인한 사용자인 Schedule 객체 필터링
    schedules = Schedule.objects.filter(Q(writer=None) | Q(writer=request.user))

    user = request.user  # 로그인한 사용자 정보 가져오기
    now = datetime.combine(date.today(), datetime.min.time()).date()

    context = {
        'schedules': schedules,
        'now': now,
        'user': user,
    }

    return render(request, 'checklist/checklist.html', context)

def calendar_view(request):
    user = request.user  # 로그인한 사용자 정보 가져오기
    schedules = Schedule.objects.filter(writer=user)  # 해당 사용자의 Schedule 객체 필터링
    # schedules = Schedule.objects.all()
    now = datetime.combine(date.today(), datetime.min.time()).date()
    context = {
        'schedules': schedules,
        'now': now,
    }
    
    return render(request, 'checklist/cal.html', context)

@csrf_exempt
def create_schedule_view(request):
    if request.method == 'POST':
        content = request.POST.get('content')
        year = request.POST.get('year')
        month = request.POST.get('month')
        day = request.POST.get('day')
        duration = request.POST.get('duration')
        writer=request.user
        
        print(duration)
        # Schedule 모델에 새로운 객체 생성 및 저장
        schedule = Schedule(
            content=content,
            date=f"{year}-{month}-{day}",
            duration=duration,
            writer=writer
        )
        schedule.save()

        return JsonResponse({'success': True})
    else:
        return JsonResponse({'success': False, 'message': 'Invalid request method'})
    

@login_required
def get_schedule_view(request):
    year = request.GET.get('year')
    month = request.GET.get('month')
    user_email = request.user.email

    schedules = Schedule.objects.filter(writer__email=user_email, date__year=year, date__month=month)
    schedule_data = [{'content': schedule.content, 'date': schedule.date} for schedule in schedules]

    return JsonResponse({'schedules': schedule_data})


def update_schedule_view(request, id=None):
    schedule = get_object_or_404(Schedule, id=id)  # 해당 ID에 해당하는 Schedule 객체 가져오기

    if request.method == 'POST':
        content = request.POST.get('content')
        year = request.POST.get('year')
        month = request.POST.get('month')
        day = request.POST.get('day')
        duration = request.POST.get('duration')
        
        print(duration)
        # Schedule 객체 수정 및 저장
        schedule.content = content
        schedule.date = f"{year}-{month}-{day}"
        schedule.duration = duration
        schedule.save()

        return JsonResponse({'success': True})
    else:
        return JsonResponse({'success': False, 'message': 'Invalid request method'})
    

def delete_schedule_view(request, id):
    if request.method == 'GET':
        schedule = get_object_or_404(Schedule, id=id)
        schedule.delete()
        
        return redirect('checklist:index')