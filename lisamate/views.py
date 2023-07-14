from django.views.generic import TemplateView
from users.models import User
from django.shortcuts import get_object_or_404, render, redirect

def index2():
    return redirect('profile', id=id)

class ProfileView(TemplateView):
    template_name = 'profile.html'

def update_profile_view(request,id):
    user = User.objects.get(id=id)

    if request.method == 'GET':
        context = {
            'id': id,
            'user': user,
        }
        return render(request, 'profile_form.html', context)
    else:
        nickname = request.POST.get('nickname')
        introduction = request.POST.get('introduction')
        new_image = request.FILES.get('image')
        
        if new_image:
            user.image.delete()
            user.image = new_image
            
        user.nickname = nickname
        user.introduction = introduction
        
        user.save()
        
        return redirect('profile', id=id)

def warning_view(request, exception):
    return render(request, 'warning.html', status=404)