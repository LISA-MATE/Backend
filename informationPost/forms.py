from django import forms
from .models import Comment

class PostForm(forms.Form):
    board_type = forms.ChoiceField(choices=[('none', '게시판 선택'), ('0', '월세 정보 공유'), ('1', '전세 정보 공유'), ('2', '매매 정보 공유'), ('3', '월세 후기'), ('4', '전세 후기'), ('5', '매매 후기'), ('6', '우리동네 현황'), ('7', '범죄자 거주 정보')], initial='none', widget=forms.Select(attrs={'id': 'postType'}))
    city = forms.ChoiceField(choices=[('none', '시/도 선택'), ('Seoul', '서울'), ('Gyeonggi', '경기'), ('Incheon', '인천'), ('Gangwon', '강원'), ('Daejeon', '대전'), ('Sejong', '세종'), ('Chungnam', '충남'), ('Chungbuk', '충북'), ('Busan', '부산'), ('Ulsan', '울산'), ('Gyeongnam', '경남'), ('Gyeongbuk', '경북'), ('Daegu', '대구'), ('Gwangju', '광주'), ('Jeonnam', '전남'), ('Jeonbuk', '전북'), ('Jeju', '제주')], initial='none', widget=forms.Select(attrs={'id': 'location', 'onchange': 'addressKindChange(this)'}))
    country = forms.ChoiceField(choices=[('none', '구/군 선택')], initial='none', widget=forms.Select(attrs={'id': 'Location2'}))
    title = forms.CharField(max_length=100, widget=forms.TextInput(attrs={'id': 'TitleInput', 'placeholder': '제목을 입력해주세요.'}))
    image = forms.ImageField(required=False, widget=forms.ClearableFileInput(attrs={'accept': 'image/*', 'id': 'imageFile', 'style': 'display: none;'}))
    video = forms.FileField(required=False, widget=forms.ClearableFileInput(attrs={'accept': 'video/*', 'id': 'videoFile', 'style': 'display: none;'}))
    file = forms.FileField(required=False, widget=forms.ClearableFileInput(attrs={'accept': 'file/*', 'id': 'fileFile', 'style': 'display: none;'}))
    content = forms.CharField(widget=forms.Textarea(attrs={'id': 'content', 'placeholder': '내용을 입력해주세요.'}))

class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ('content',) 