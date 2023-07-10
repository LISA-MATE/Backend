from django.views.generic import TemplateView

class MainView(TemplateView):
    template_name = 'checklist.html'

class ProfileView(TemplateView):
    template_name = 'profile.html'