document.addEventListener('DOMContentLoaded', function() {
    var isEditClicked=false;

    //수정 버튼
    function editClick() {
        event.preventDefault(); // 폼 제출 동작 막기
        isEditClicked = true;
    
        //수정 버튼 숨기기
        var editButton = document.getElementById('edit');
        editButton.style.display = 'none';
    
        //<p> 숨기기
        var explainText = document.getElementById('explaintext');
        explainText.style.display = 'none';
    
        //input 박스 생성
        var inputBox = document.createElement('input');
        inputBox.type = 'text';
        inputBox.value = explainText.textContent;
        inputBox.id = 'explaintext';
        inputBox.className = 'input-box';
    
        inputBox.onclick = function (event) {
            event.stopPropagation();
        };
    
        //새로운 내용 입력
        var explainBox2 = document.querySelector('.ExplainContainer2');
        explainBox2.appendChild(inputBox);
    
        //수정 전 내용 제거
        explainBox2.removeChild(explainText); //소개글 완료
    
        var profileText = document.getElementById('uname');
        profileText.style.display = 'none';
    
        var inputBox2 = document.createElement('input');
        inputBox2.type = 'text';
        inputBox2.value = profileText.textContent;
        inputBox2.id = 'uname';
        inputBox2.className = 'input-box2';
    
        var emailBox = document.querySelector('.emailbox');
        emailBox.style.marginTop = '20%';
    
        inputBox2.onclick = function (event) {
            event.stopPropagation();
        };
    
        var profileBox = document.querySelector('.profilebox');
        profileBox.appendChild(inputBox2);
    
        profileBox.removeChild(profileText); //같은 방식으로 닉네임 완료 
    }
    
    //사진 수정 버튼 누르면 실행
    function rephotoButtonClickHandler() {
        event.preventDefault();
        if (!isEditClicked) {
            return; // 수정 버튼을 누르지 않은 경우 작동 안됨
        }
        openModal();
    }
    
    //수정 버튼 클릭 이벤트
    var editButton = document.getElementById('edit');
    editButton.addEventListener('click', editClick);
    
    //사진 수정 버튼 클릭 이벤트
    var rephotoButton = document.getElementById('rephoto');
    rephotoButton.addEventListener('click', rephotoButtonClickHandler);
    
    //수정 완료 버튼
    function saveClick() {
        console.log('Save button clicked!');
        event.preventDefault(); // 폼 제출 동작 막기

        //input박스에 입력한 내용 가져오기
        var inputBox = document.getElementById('explaintext');
        var inputValue = inputBox.value;
    
        //값이 비어있는지 확인
        if (inputValue.trim() === '') {
            return;
        }
    
        //입력 내용을 출력할 요소 <p>로 설정
        var explainBox2 = document.querySelector('.ExplainContainer2');
    
        var pElement = document.createElement('input');
        pElement.id = 'explaintext';
        pElement.name = 'introduction';
        pElement.value = inputValue;
        pElement.style.textAlign = 'right';
    
        //수정 버튼 화면에 표시
        var editButton = document.getElementById('edit');
        editButton.style.display = 'block';
    
        //완료 버튼 화면에 표시
        var saveButton = document.getElementById('save');
        saveButton.style.display = 'block';
    
        //기존 맨 처음 출력된 요소 제거
        var existingPElement = document.getElementById('explaintext');
        if (existingPElement) {
            explainBox2.removeChild(existingPElement);
        }
    
        //새로운 요소 출력
        explainBox2.appendChild(pElement);
    
        explainBox2.style.justifyContent = 'flex-end';  //소개글 수정 완료
    
        var inputBox2 = document.getElementById('uname');
        var inputValue2 = inputBox2.value;
    
        if (inputValue2.trim() === '') {
            return;
        }
    
        var profileBox = document.querySelector('.profilebox');
    
        var pElement2 = document.createElement('input');
        pElement2.id = 'uname';
        pElement2.name = 'nickname';
        pElement2.value = inputValue2;
        pElement2.className='input-box3';
    
        var existingPElement2 = document.getElementById('uname');
        if (existingPElement2) {
            profileBox.removeChild(existingPElement2);
        }
    
        profileBox.appendChild(pElement2);
        profileBox.style.justifyContent = 'flex-end';   //같은 방식으로 닉네임 수정 완료
    
        //바뀐 닉네임을 왼쪽 userbox 프로필에도 결과 출력
        var profileId = document.querySelector('.name');
        profileId.textContent = inputValue2;
    
        //바뀐 소개글을 왼쪽 userbox 프로필에도 결과 출력
        var profileExplain = document.querySelector('.explain');
        profileExplain.textContent = inputValue;
    
        //프로필 이미지를 profile 박스와 왼쪽 프로필 둘 다 변경
        var mainPhotoBox = document.querySelector('.photo');
        var userImageBox = document.querySelector('.userImage');
        var uploadedPhotoUrl = mainPhotoBox.style.backgroundImage;
    
        mainPhotoBox.style.backgroundImage = uploadedPhotoUrl;
        mainPhotoBox.style.backgroundSize = 'cover';
        mainPhotoBox.style.backgroundPosition = 'center';
        mainPhotoBox.style.backgroundRepeat = 'no-repeat';
    
        userImageBox.style.backgroundImage = uploadedPhotoUrl;
        userImageBox.style.backgroundSize = 'cover';
        userImageBox.style.backgroundPosition = 'center';
        userImageBox.style.backgroundRepeat = 'no-repeat';

        // 값이 비어있는지 확인
        if (inputValue.trim() === '' || inputValue2.trim() === '') {
            return;
        }
    
        // AJAX 요청을 사용하여 수정된 정보를 서버로 전송하고 저장
        var xhr = new XMLHttpRequest();
        var csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value; // CSRF 토큰 가져오기
        var formData = new FormData();
        formData.append('nickname', inputValue2);
        formData.append('introduction', inputValue);
        formData.append('image', photoInput);
    
        xhr.open('POST', '/profile/');  // 현재 URL로 POST 요청을 보냄
        xhr.setRequestHeader('X-CSRFToken', csrfToken);
        xhr.onload = function () {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                if (response.success) {
                    // 요청이 성공한 경우
                    window.location.href = '/profile/';  // profile/ URL로 리다이렉션
                } else {
                    // 요청이 실패한 경우
                    alert(response.message); // 실패 메시지를 사용자에게 표시하거나 처리하는 로직 추가
                }
            } else {
                // 오류 처리 로직
                alert('요청이 실패했습니다. 다시 시도해주세요.');
            }
        };
    
        xhr.send(formData);
    
        isEditClicked = false;
    }  
    
    
    //close 버튼 누르면 모달 종료
    function closeModal(event) {
        event.preventDefault();
        const modalContainer = document.getElementById("modalContainer");
        modalContainer.style.display = "none";
    }
    
    // 모달 초기화 여부
    var isModalInitialized = false;
    
    // 모달 초기화 함수
    function initializeModal() {
        if (isModalInitialized) {
            return;
        }
    
        //photo에 있는 사진의 background를 photoimage에 담아 초기 값 주기
        var mainPhotoBox = document.querySelector('.photo');
        var photoBox = document.querySelector('.photoImage');
        var photoBoxStyle = getComputedStyle(mainPhotoBox);
    
        photoBox.style.backgroundImage = photoBoxStyle.backgroundImage;
        photoBox.style.backgroundSize = photoBoxStyle.backgroundSize;
        photoBox.style.backgroundPosition = photoBoxStyle.backgroundPosition;
        photoBox.style.backgroundRepeat = photoBoxStyle.backgroundRepeat;
    
        isModalInitialized = true;
    }
    
    // 모달 열기 함수
    function openModal() {
        const modalContainer = document.getElementById('modalContainer');
        modalContainer.style.display = 'flex';
        setTimeout(initializeModal, 0); // 모달이 열린 후에 초기화
    }

    var photoInput = document.getElementById('photoInput');
    photoInput.addEventListener('change', handleFileUpload);

    // 사진 업로드 이벤트 -> input
    function handleFileUpload(event) {
        var file = event.target.files[0];
        var reader = new FileReader();

        reader.onload = function (e) {
            var photoImage = document.querySelector('.modal .photobox .photoImage');
            photoImage.style.backgroundImage = `url(${e.target.result})`;
            photoImage.style.backgroundSize = 'cover';
            photoImage.style.backgroundPosition = 'center';
            photoImage.style.backgroundRepeat = 'no-repeat';
        };

        reader.readAsDataURL(file);
    }


    // 수정 버튼 클릭 이벤트 처리를 위해 DOM 트리 구성 완료 이벤트에 추가
    document.addEventListener('DOMContentLoaded', function() {
        var editButton = document.getElementById('edit');
        editButton.addEventListener('click', editClick);
    
        var rephotoButton = document.getElementById('rephoto');
        rephotoButton.addEventListener('click', rephotoButtonClickHandler);
    
        var saveButton = document.getElementById('save');
        saveButton.addEventListener('click', saveClick);
    
        var closeButton = document.getElementById('close');
        closeButton.addEventListener('click', closeModal);
    
        var photoInput = document.getElementById('photoInput');
        photoInput.addEventListener('change', handleFileUpload);
    });
});
