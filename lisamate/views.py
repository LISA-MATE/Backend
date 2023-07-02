from django.views.generic import TemplateView

class MainView(TemplateView):
    template_name = 'mypage.html'

class LoginView(TemplateView):
    template_name = 'login.html'