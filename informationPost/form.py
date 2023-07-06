from django import forms
from .models import Post

class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['board_type', 'topic', 'title', 'content', 'image', 'file', 'writer', 'city', 'country']
        
        widgets = { 
            'topic': forms.Select(attrs={'class': 'form-control'}),
        }