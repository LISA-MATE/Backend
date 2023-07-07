from django.contrib.auth.models import User
from django.shortcuts import render, redirect
from django.contrib.auth import login, logout
from django.contrib.auth import authenticate

def signup_view(request):
    # GET 요청 시 HTML 응답
    if request.method == 'GET':
        return render(request, 'accounts/signup.html')
    else:
        # 리다이렉트
        id = request.POST.get('id')
        email = request.POST.get('email')
        password = request.POST.get('password')
        
        # 데이터 유효성 검사
        if not id or not email or not password:
            error_message = '모든 필드를 입력해주세요.'
            return render(request, 'accounts/signup.html', {'error_message': error_message})

        # 아이디, 이메일 데이터 중복 확인
        if User.objects.filter(id=id).exists():
            error_message = '사용 불가능한 아이디입니다.'
            return render(request, 'accounts/signup.html', {'error_message': error_message})
        if User.objects.filter(email=email).exists():
            error_message = '사용 불가능한 이메일입니다.'
            return render(request, 'accounts/signup.html', {'error_message': error_message})

        # 데이터 저장
        user = User.objects.create_user(username=id, email=email, password=password)

        # 회원가입 후 로그인
        login(request, user)
        # 리다이렉트
        return redirect('lisamate:mypage') 

def login_view(request):
    # GET, POST 분리
    if request.method == 'GET':
        # 로그인 HTML 응답
        return render(request, 'accounts/login.html')
    else:
        id = request.POST.get('id')
        password = request.POST.get('password')

        # 아이디, 비밀번호 유효성 검사
        if not id:
            error_message = '아이디를 입력해주세요.'
        elif not password:
            error_message = '비밀번호를 입력해주세요.'
        else:
            # 사용자 인증
            user = authenticate(request, id=id, password=password)

            if user is not None:
                # 사용자 인증 성공 시 로그인
                login(request, user)
                # 리다이렉트
                return redirect('accounts:login')
            else:
                # 사용자 인증 실패 시 에러 처리
                error_message = '아이디 또는 비밀번호가 올바르지 않습니다.'
                return render(request, 'accounts/login.html', {'error_message': error_message})

def logout_view(request):
    # 데이터 유효성 검사
    # 로그인일 때
    if request.user.is_authenticated:
        # 로그아웃 로직 처리
        logout(request)
        # 리다이렉트
        return redirect('mypage')

        