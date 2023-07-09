"""
URL configuration for lisamate project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from lisamate.views import ProfileView
from django.views.generic import RedirectView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', RedirectView.as_view(pattern_name='checklist:index', permanent=False)),
    path('checklist/', include('checklist.urls', namespace='checklist')),
    path('accounts/', include('accounts.urls', namespace='accounts')),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('boards/', include('informationPost.urls', namespace='informationPost')),

]

# MEDIA_URL로 들어오면 MEDIA_ROOT에서 정의한 걸 찾아서 사용
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
