from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Post(models.Model):
    board_type_CHOICES = (
        ('information', '정보게시판'),
        ('review', '후기게시판'),
        ('hometown', '우리동네게시판'),
    )
    
    board_type = models.CharField(verbose_name='게시판 종류', max_length=20, choices=board_type_CHOICES)
    topic = models.CharField(verbose_name='해당 게시물에 대한 topic', max_length=20)
    title = models.CharField(verbose_name='제목', max_length=100)
    content = models.TextField(verbose_name='내용')
    image = models.ImageField(verbose_name='이미지', null=True, blank=True, upload_to='boards/images/')
    file = models.FileField(verbose_name='파일', null=True, blank=True, upload_to='boards/files/')
    writer = models.ForeignKey(to=User, on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(verbose_name='작성일', auto_now_add=True)
    view_count = models.IntegerField(verbose_name='조회수', default=0)
    city = models.CharField(verbose_name='도/시', max_length=10)  # 도/시 필드
    country = models.CharField(verbose_name='구/군', max_length=10)  # 구/군 필드
    
    def __str__(self):
        return self.title

    # TOPIC_CHOICES = {
    #     'information': (
    #         ('전세', '전세'),
    #         ('월세', '월세'),
    #         ('매매', '매매'),
    #     ),
    #     'review': (
    #         ('전세', '전세'),
    #         ('월세', '월세'),
    #         ('매매', '매매'),
    #     ),
    #     'local': (
    #         ('우리동네', '우리동네'),
    #         ('범죄자', '범죄자'),
    #     ),
    # }

        
    # topic = models.CharField(verbose_name='해당 게시물에 대한 topic', max_length=20, choices=TOPIC_CHOICES.get(board_type, ())) 

class Comment(models.Model): # 댓글
    content = models.TextField(verbose_name='내용')
    created_at = models.DateTimeField(verbose_name='작성일')
    post = models.ForeignKey(to='Post', on_delete=models.CASCADE)
    writer = models.ForeignKey(to=User, on_delete=models.CASCADE, null=True, blank=True)
