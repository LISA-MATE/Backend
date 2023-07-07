from django.shortcuts import render, redirect

from .models import Post
from .form import PostForm

def index(request):
    return redirect('boards:information-list')

def information_list_view(request):
    post_list = Post.objects.filter(board_type='information').order_by('-created_at')
    context = {
        'post_list': post_list
    }
    return render(request, 'boards/information_list.html', context)

def review_list_view(request):
    post_list = Post.objects.filter(board_type='review').order_by('-created_at')
    context = {
        'post_list': post_list
    }
    return render(request, 'boards/review_list.html', context)

def hometown_list_view(request):
    post_list = Post.objects.filter(board_type='hometown').order_by('-created_at')
    context = {
        'post_list': post_list
    }
    return render(request, 'boards/hometown_list.html', context)


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
            post = form.save()
            # 폼이 성공적으로 저장될 경우의 처리 로직
            board_type = post.board_type

            if board_type == 'information':
                return redirect('boards:information-list')
            elif board_type == 'review':
                return redirect('boards:review-list')
            elif board_type == 'hometown':
                return redirect('boards:hometown-list')
            
    else:
        form = PostForm()
        
    return render(request, 'boards/board_form.html', {'form': form})
