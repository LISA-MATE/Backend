from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
import json
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods, require_POST
from django.contrib.auth import get_user_model

User = get_user_model()


def signup_view(request):
    if request.method == 'POST':
        nickname = request.POST.get('nickname')
        email = request.POST.get('email')
        password = request.POST.get('password')
        
        # 데이터 유효성 검사
        if not nickname or not email or not password:
            error_message = '모든 필드를 입력해주세요.'
            return render(request, 'accounts/signup.html', {'error_message': error_message})

        # 사용자 이름, 이메일 데이터 중복 확인
        if User.objects.filter(nickname=nickname).exists():
            error_message = '사용 불가능한 닉네임입니다.'
            return render(request, 'accounts/signup.html', {'error_message': error_message})
        if User.objects.filter(email=email).exists():
            error_message = '사용 불가능한 이메일입니다.'
            return render(request, 'accounts/signup.html', {'error_message': error_message})

        # 데이터 저장
        user = User.objects.create_superuser(nickname=nickname, password=password, email=email)
        user.save()
        
        # 회원가입 후 로그인
        user.backend = 'django.contrib.auth.backends.ModelBackend'
        login(request, user)

        # 리다이렉트
        return redirect('accounts:login') 
    
    # GET 요청 시 HTML 응답
    return render(request, 'accounts/signup.html')

def login_view(request):
    # GET, POST 분리
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        # 이메일, 비밀번호 유효성 검사
        if not email:
            error_message = '이메일을 입력해주세요.'
            return render(request, 'accounts/login.html', {'error_message': error_message})
        if not password:
            error_message = '비밀번호를 입력해주세요.'
            return render(request, 'accounts/login.html', {'error_message': error_message})
        
        # 사용자 인증
        user = authenticate(request, email=email, password=password)

        if user is not None:
            # 사용자 인증 성공 시 로그인
            user.backend = 'django.contrib.auth.backends.ModelBackend'
            login(request, user)
            # 리다이렉트
            return redirect('checklist:index')
        else:
            # 사용자 인증 실패 시 에러 처리
            error_message = '이메일 또는 비밀번호가 올바르지 않습니다.'
            return render(request, 'accounts/login.html', {'error_message': error_message})
    
    # 로그인 HTML 응답
    return render(request, 'accounts/login.html')

@login_required
@require_http_methods(["GET", "POST"]) # 데코레이터 추가하여 GET 및 POST 메서드만 허용
def profile_view(request):
    if request.method == 'POST':
        # POST 요청으로부터 전달받은 데이터 추출
        nickname = request.POST.get('nickname')
        introduction = request.POST.get('introduction')

        # 필요한 작업 수행
        request.user.nickname = nickname
        request.user.introduction = introduction

        if request.FILES.get('image'):
            request.user.image = request.FILES['image']

        request.user.save()

        # 응답 데이터 생성
        response_data = {
            'success': True,
            'message': '프로필이 성공적으로 업데이트되었습니다.'
        }

        # JSON 형태의 응답 반환
        return JsonResponse(response_data)

    elif request.method == 'GET':
        # GET 요청에 대한 처리 로직
        user = request.user
        context = {
            'user': user
        }
        return render(request, 'profile.html', context)


def logout_view(request):
    # 데이터 유효성 검사
    # 로그인일 때
    if request.user.is_authenticated:
        # 로그아웃 로직 처리
        logout(request)
        # 리다이렉트
        return redirect('accounts:login')
    
@require_POST
def delete_view(request):
    if request.user.is_authenticated:
        request.user.delete()
        logout(request) # 세션 지워주기
        
        return redirect('checklist:index')