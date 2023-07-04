from django.shortcuts import render, redirect

def signup_view(request):
    # GET 요청 시 HTML 응답
    if request.method == 'GET':
        return render(request, 'accounts/signup.html')
    else:
        # 리다이렉트
        return redirect('accounts:signup')
    
def login_view(request):
    # GET, POST 분리
    if request.method == 'GET':
        # 로그인 HTML 응답
        return render(request, 'accounts/login.html')
    else:
        pass
    
def logout_view(request):
        # 로그인일 때
        pass