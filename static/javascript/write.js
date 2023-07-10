const modal = document.getElementById("modal");
const openModalBtn = document.getElementById("open-modal");
const closeModalBtn = document.getElementById("close-modal");
const form = document.querySelector('form');
const submitButton = document.getElementById('submitButton');
const fileInput = document.getElementById('bizFile');
const textBox = document.getElementById('textareaContainer');

// 모달창 열기
openModalBtn.addEventListener("click", (event) => {
    event.preventDefault(); // 폼 제출 방지
    modal.style.display = "block";
});

// 모달창 닫기
closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
    setTimeout(handleFileUpload, 0); // 모달 닫힌 후에 이미지 처리
});

// 폼 제출 이벤트 핸들러
form.addEventListener('submit', (event) => {
    event.preventDefault();
});

// 등록하기 버튼 클릭 이벤트 핸들러
submitButton.addEventListener('click', () => {
    form.submit(); // 폼 제출
});

// 사진 업로드 커스텀 버튼 기능
fileInput.addEventListener('change', function () {
    const filename = document.getElementById('fileName');
    if (this.files[0] == undefined) {
        filename.innerText = '선택된 파일 없음';
        return;
    }
    filename.innerText = this.files[0].name;
});

// 이미지 파일 업로드 시 처리
function handleFileUpload() {
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const imageSrc = e.target.result;
        const imageElement = document.createElement("img");
        imageElement.src = imageSrc;
        textBox.appendChild(imageElement);

        // 캐럿(커서) 위치를 마지막으로 이동
        textBox.focus();
        const range = document.createRange();
        range.selectNodeContents(textBox);
        range.collapse(false);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    };

    if (file) {
        reader.readAsDataURL(file);
    }
}

// 파일 업로드 이벤트 처리
fileInput.addEventListener("change", handleFileUpload);
