from django.contrib import admin
from .models import Post, Comment
from django.forms import ModelForm

admin.site.register(Comment)

class CommentInline(admin.TabularInline):
    model = Comment
    extra = 3
    min_num = 0
    max_num = 5
    verbose_name = '댓글'
    verbose_name_plural = '댓글'

@admin.register(Post)
class PostModelAdmin(admin.ModelAdmin):
    # 기타 설정 생략

    def changeform_view(self, request, object_id=None, form_url='', extra_context=None):
        if object_id:
            obj = self.get_object(request, object_id)
            form = self.get_form(request)(instance=obj)
            if form.is_valid():
                board_type = form.cleaned_data.get('board_type')
                if board_type:
                    form.fields['topic'].queryset = Post.TOPIC_CHOICES.get(board_type, ())
        return super().changeform_view(request, object_id, form_url, extra_context)