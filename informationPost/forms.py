from django import forms

class PostForm(forms.Form):
    BOARDS_TYPE_CHOICES = (
        (0, '월세 정보 공유'),
        (1, '전세 정보 공유'),
        (2, '매매 정보 공유'),
        (3, '월세 후기'),
        (4, '전세 후기'),
        (5, '매매 후기'),
        (6, '우리동네 현황'),
        (7, '범죄자 거주 정보'),
    )
    board_type = forms.ChoiceField(choices=BOARDS_TYPE_CHOICES, widget=forms.Select(attrs={'class': 'selectBox1'}))
    city = forms.CharField(max_length=10, widget=forms.TextInput(attrs={'id': 'CityInput', 'placeholder': '도/시를 입력해주세요.'}))
    country = forms.CharField(max_length=10, widget=forms.TextInput(attrs={'id': 'CountryInput', 'placeholder': '구/군을 입력해주세요.'}))
    title = forms.CharField(max_length=100, widget=forms.TextInput(attrs={'id': 'TitleInput', 'placeholder': '제목을 입력해주세요.'}))
    content = forms.CharField(widget=forms.Textarea(attrs={'id': 'TextareaContainer', 'contenteditable': 'true'}))
    image = forms.FileField()
    file = forms.FileField()