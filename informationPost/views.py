from django.shortcuts import get_object_or_404, render, redirect

from .models import Post
from .forms import PostForm

def index(request):
    return redirect('boards:board-list', board_type='information')

def board_list_view(request, board_type=None):
    posts = Post.objects.all()

    if board_type:
        posts = posts.filter(board_type=board_type)

    context = {
        'board_type': board_type,
        'post_list': posts
    }

    return render(request, 'boards/board_list.html', context)

def board_topic_list_view(request, board_type=None, topic=None):
    posts = Post.objects.filter(board_type=board_type)

    if topic:
        posts = posts.filter(topic=topic)

    context = {
        'board_type': board_type,
        'topic': topic,
        'post_list': posts
    }

    return render(request, 'boards/board_list.html', context)

def post_detail_view(request, board_type=None, topic=None, id=None):
    post = Post.objects.get(id=id, board_type=board_type, topic=topic)
    
    context = {
        'board_type': board_type,
        'topic': topic,
        'post': post
    }

    return render(request, 'boards/post_detail.html', context)


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
            board_type = request.POST.get('board_type')

            return redirect('boards:board-list', board_type=board_type)
        else:
            print("INVALID")
    else:
        form = PostForm()
    
    context = {
        'form': form,
        'title': '글쓰기'
    }
        
    return render(request, 'boards/board_form.html', context)

def post_update_view(request, board_type=None, topic=None, id=None):
    post = Post.objects.get(id=id)

    if request.method == 'GET':
        form = PostForm(instance=post)
        context = {
            'post': post,
            'form': form, 
            'title': '수정하기'
        }
        return render(request, 'boards/board_form.html', context)
    else:
        new_image = request.FILES.get('image')
        new_file = request.FILES.get('file')
        board_type = request.POST.get('board_type')
        topic = request.POST.get('topic')
        title = request.POST.get('title')
        city = request.POST.get('city')
        country = request.POST.get('country')
        content = request.POST.get('content')

        if new_image:
            post.image.delete()
            post.image = new_image
            
        if new_file:
            post.file.delete()
            post.file = new_file

        post.board_type = board_type
        post.topic = topic
        post.title = title
        post.city = city 
        post.country = country
        post.content = content
        
        post.save()

        return redirect('boards:board-topic-detail', board_type=board_type, topic=topic, id=id)


def post_delete_view(request, id):
    if request.method == 'GET':
        post = get_object_or_404(Post, id=id)
        board_type = post.board_type
        post.delete()
        return redirect('boards:board-list', board_type= board_type)
    