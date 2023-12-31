from django.shortcuts import get_object_or_404, render, redirect

from .models import Post, Comment
from .forms import PostForm, CommentForm
from django.db.models import F
from django.http import JsonResponse
from django.db.models import Count

def index(request):
    return redirect('boards:board-list', board_type='information')

def board_list_view(request, board_type=None):
    posts = Post.objects.all()

    if board_type:
        posts = posts.filter(board_type=board_type)

    posts = posts.annotate(comment_count=Count('comments'))

    context = {
        'board_type': board_type,
        'post_list': posts
    }

    return render(request, 'boards/board_list.html', context)

def board_topic_list_view(request, board_type=None, topic=None):
    posts = Post.objects.filter(board_type=board_type)

    if topic:
        posts = posts.filter(topic=topic)

    posts = posts.annotate(comment_count=Count('comments'))

    context = {
        'board_type': board_type,
        'topic': topic,
        'post_list': posts,
        
    }

    return render(request, 'boards/board_list.html', context)

def post_detail_view(request, board_type=None, topic=None, id=None):
    post = Post.objects.get(id=id, board_type=board_type, topic=topic)
    
    # 댓글 조회
    comments = Comment.objects.filter(post=post)

    # view_count 필드를 1 증가시킴
    Post.objects.filter(id=id, board_type=board_type, topic=topic).update(view_count=F('view_count')+1)
    
    context = {
        'board_type': board_type,
        'topic': topic,
        'post': post,
        'comments': comments,  # 댓글 객체들을 전달
    }

    return render(request, 'boards/post_detail.html', context)


def post_create_form_view(request):
    if request.method == 'POST':     
        board_type = request.POST.get('board_type')
        title = request.POST.get('title')
        content = request.POST.get('content')
        image = request.FILES.get('image')
        file = request.FILES.get('file')
        city = request.POST.get('city')
        country = request.POST.get('country')
        
        if board_type == '0':
            board_type = 'information'
            topic = '월세'
        elif board_type == '1':
            board_type = 'information'
            topic = '전세'
        elif board_type == '2':
            board_type = 'information'
            topic = '매매'
        elif board_type == '3':
            board_type = 'review'
            topic = '월세'
        elif board_type == '4':
            board_type = 'review'
            topic = '전세'
        elif board_type == '5':
            board_type = 'review'
            topic = '매매'
        elif board_type == '6':
            board_type = 'hometown'
            topic = '우리동네'
        elif board_type == '7':
            board_type = 'hometown'
            topic = '범죄자'


        Post.objects.create(
            board_type = board_type,
            title = title,
            content=content,
            image=image,
            writer=request.user,
            file = file,
            city = city,
            country= country,
            topic=topic,
        )
        return redirect('boards:board-list', board_type=board_type)
    
    return render(request, 'boards/board_form.html')


def post_update_view(request, board_type=None, topic=None, id=None):
    post = Post.objects.get(id=id)

    if request.method == 'GET':
        context = {
            'post': post,
            'title': '수정하기'
        }
        return render(request, 'boards/board_form.html', context)
    else:
        new_image = request.FILES.get('image')
        new_file = request.FILES.get('file')
        board_type = request.POST.get('board_type')
        title = request.POST.get('title')
        city = request.POST.get('city')
        country = request.POST.get('country')
        content = request.POST.get('content')
        
        if board_type == '0':
            board_type = 'information'
            topic = '월세'
        elif board_type == '1':
            board_type = 'information'
            topic = '전세'
        elif board_type == '2':
            board_type = 'information'
            topic = '매매'
        elif board_type == '3':
            board_type = 'review'
            topic = '월세'
        elif board_type == '4':
            board_type = 'review'
            topic = '전세'
        elif board_type == '5':
            board_type = 'review'
            topic = '매매'
        elif board_type == '6':
            board_type = 'hometown'
            topic = '우리동네'
        elif board_type == '7':
            board_type = 'hometown'
            topic = '범죄자'

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


# def add_comment(request, post_id):
#     post = get_object_or_404(Post, id=post_id)
    
#     if request.method == 'POST':
#         form = CommentForm(request.POST)
#         if form.is_valid():
#             comment = form.save(commit=False)
#             comment.post = post
#             comment.writer = request.user
#             comment.save()
#             return redirect('boards:post_detail', post_id=post_id)
#     else:
#         form = CommentForm()
    
#     return render(request, 'boards:post_detail', {'form': form})

def create_comment_view(request, post_id):
    if request.method == 'POST' and request.user.is_authenticated:
        content = request.POST.get('content')
        post = get_object_or_404(Post, pk=post_id)
        
        Comment.objects.create(content=content, post=post, writer_id=request.user.id)
        # Comment 객체 생성 후 추가 작업을 수행할 수 있습니다.
        
        return redirect('boards:board-topic-detail', board_type=post.board_type, topic=post.topic, id=post_id)
    else:
        return JsonResponse({'success': False, 'message': 'Invalid request'})


def delete_comment_view(request, comment_id):
    if request.method == 'POST' and request.user.is_authenticated:
        comment = get_object_or_404(Comment, pk=comment_id)
        post = comment.post  # 삭제된 댓글이 속한 게시물 가져오기
        # 필요한 추가 작업 수행
        comment.delete()  # 댓글 삭제
    
        return redirect('boards:board-topic-detail', board_type=post.board_type, topic=post.topic, id=post.id)
    else:
        return JsonResponse({'success': False, 'message': 'Invalid request'})