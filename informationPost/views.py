from django.shortcuts import render, redirect

from .models import Post
from .form import PostForm

def index(request):
    # post_list = Post.objects.all().select_related('writer').prefetch_related('comment_set').order_by('-created_at')
    post_list = Post.objects.all().order_by('-created_at')
    context = {
        'post_list': post_list
    }
    return render(request, 'boards/board_list.html', context)

def post_create_form_view(request):
    # if request.method == 'GET':
    #     return render(request, 'boards/board_form.html')
    # else: # Post이면 
    #     board_type = request.POST.get('board_type')
    #     title = request.POST.get('title')
    #     content = request.POST.get('content')
    #     image = request.FILES.get('image')
    #     file = request.FILES.get('file')
    #     city = request.POST.get('city')
    #     country = request.POST.get('country')

    #     Post.objects.create(
    #         board_type = board_type,
    #         title = title,
    #         content=content,
    #         image=image,
    #         writer=request.user,
    #         file = file,
    #         city = city,
    #         country= country,
    #     )
        
        
    #     return redirect('index')
    
    
    if request.method == 'POST':
        form = PostForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            # 폼이 성공적으로 저장될 경우의 처리 로직
            return redirect('boards:post-list')
    else:
        form = PostForm()
        
    return render(request, 'boards/board_form.html', {'form': form})
