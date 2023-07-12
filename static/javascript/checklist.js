//close 버튼 누르면 모달 종료
function closeModal() {
    const modalContainer = document.getElementById("modalContainer");
    modalContainer.style.display = "none";
}

// 모달 열기 함수
function openModal() {
    const modalContainer = document.getElementById('modalContainer');
    modalContainer.style.display = 'flex';
    setTimeout(initializeModal, 0); // 모달이 열린 후에 초기화
}

document.addEventListener('DOMContentLoaded', function () {
    const checkboxes = document.querySelectorAll('.checkbox > .first_checkbox');

    checkboxes.forEach(function (checkbox) {
        const editBtn = checkbox.querySelector('.editBtn');
        const removeBtn = checkbox.querySelector('.removeBtn');
        const editIcon = editBtn.querySelector('.fa-pen');
        const removeIcon = removeBtn.querySelector('.fa-x');
        const checkboxText = checkbox.querySelector('.first_checkbox_text');
        let clicked = false;

        checkbox.addEventListener('click', function () {
            clicked = !clicked;

            if (clicked) {
                checkbox.style.background = '#5377FF';
                editBtn.style.background = '#5377FF';
                removeBtn.style.background = '#5377FF';
                editIcon.style.color='#FFFFFF';
                removeIcon.style.color='#FFFFFF';
                checkboxText.style.color='#FFFFFF';
            } else {
                checkbox.style.background = '#FFFFFF';
                editBtn.style.background = '#FFFFFF';
                removeBtn.style.background = '#FFFFFF';
                editIcon.style.color = '#000000';
                removeIcon.style.color = '#000000';
                checkboxText.style.color = '#000000';
            }
        });

        editBtn.addEventListener('click', function (event) {
            event.stopPropagation();
        });

        removeBtn.addEventListener('click', function (event) {
            event.stopPropagation();
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const checkboxes = document.querySelectorAll('.checkbox > .second_checkbox');

    checkboxes.forEach(function (checkbox) {
        const editBtn = checkbox.querySelector('.editBtn2');
        const removeBtn = checkbox.querySelector('.removeBtn2');
        const editIcon = editBtn.querySelector('.fa-pen');
        const removeIcon = removeBtn.querySelector('.fa-x');
        const checkboxText = checkbox.querySelector('.second_checkbox_text');
        let clicked = false;

        checkbox.addEventListener('click', function () {
            clicked = !clicked;

            if (clicked) {
                checkbox.style.background = '#5377FF';
                editBtn.style.background = '#5377FF';
                removeBtn.style.background = '#5377FF';
                editIcon.style.color = '#FFFFFF';
                removeIcon.style.color = '#FFFFFF';
                checkboxText.style.color = '#FFFFFF';
            } else {
                checkbox.style.background = '#FFFFFF';
                editBtn.style.background = '#FFFFFF';
                removeBtn.style.background = '#FFFFFF';
                editIcon.style.color = '#000000';
                removeIcon.style.color = '#000000';
                checkboxText.style.color = '#000000';
            }
        });

        editBtn.addEventListener('click', function (event) {
            event.stopPropagation();
        });

        removeBtn.addEventListener('click', function (event) {
            event.stopPropagation();
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const checkboxes = document.querySelectorAll('.checkbox > .third_checkbox');

    checkboxes.forEach(function (checkbox) {
        const editBtn = checkbox.querySelector('.editBtn3');
        const removeBtn = checkbox.querySelector('.removeBtn3');
        const editIcon = editBtn.querySelector('.fa-pen');
        const removeIcon = removeBtn.querySelector('.fa-x');
        const checkboxText = checkbox.querySelector('.third_checkbox_text');
        let clicked = false;

        checkbox.addEventListener('click', function () {
            clicked = !clicked;

            if (clicked) {
                checkbox.style.background = '#5377FF';
                editBtn.style.background = '#5377FF';
                removeBtn.style.background = '#5377FF';
                editIcon.style.color = '#FFFFFF';
                removeIcon.style.color = '#FFFFFF';
                checkboxText.style.color = '#FFFFFF';
            } else {
                checkbox.style.background = '#FFFFFF';
                editBtn.style.background = '#FFFFFF';
                removeBtn.style.background = '#FFFFFF';
                editIcon.style.color = '#000000';
                removeIcon.style.color = '#000000';
                checkboxText.style.color = '#000000';
            }
        });

        editBtn.addEventListener('click', function (event) {
            event.stopPropagation();
        });

        removeBtn.addEventListener('click', function (event) {
            event.stopPropagation();
        });
    });
});

const items = document.querySelectorAll('.checkbox');

items.forEach(item => {
    item.addEventListener('click', () => {
        if (!item.classList.contains('active')) {
            items.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
});

let clicked1 = false;
let clicked2 = false;
let clicked3 = false;
document.addEventListener('DOMContentLoaded', function () {
    const checkbox = document.querySelector('.modal >.checkboxContainer> #item1');

    checkbox.addEventListener('click', function () {
        clicked1 = !clicked1;

        if (clicked1 && !clicked2 && !clicked3) {
            this.style.background = '#5377FF';
            //cnt올리기?
        } else {
            this.style.background = '#FFFFFF';
            //cnt내리기?
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const checkbox = document.querySelector('.modal >  .checkboxContainer> #item2');

    checkbox.addEventListener('click', function () {
        clicked2 = !clicked2;

        if (!clicked1 && clicked2 && !clicked3) {
            this.style.background = '#5377FF';
            //cnt올리기?
        } else {
            this.style.background = '#FFFFFF';
            //cnt내리기?
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const checkbox = document.querySelector('.modal > .checkboxContainer> #item3');

    checkbox.addEventListener('click', function () {
        clicked3 = !clicked3;

        if (!clicked1 && !clicked2 && clicked3) {
            this.style.background = '#5377FF';
            //cnt올리기?
        } else {
            this.style.background = '#FFFFFF';
            //cnt내리기?
        }
    });
});

function toggleCheckbox(id) {
    var checkbox = document.getElementById(id);
    checkbox.classList.toggle("active");
}

// 모달에서 data 전달하기 
function createData(){
    // 데이터 수집
    var content = document.getElementById("modal_Input").value;
    var year = document.getElementById("year").value;
    var month = document.getElementById("month").value;
    var day = document.getElementById("day").value;
    var duration = "";
    
    var checkboxes = document.getElementsByClassName("checkbox_period");
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].classList.contains("active")) {
            duration = checkboxes[i].getAttribute("value");
            break;
        }
    }

    // AJAX 요청 보내기
    var xhr = new XMLHttpRequest();
    var url = "create_schedule/"; // 요청을 처리할 URL
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                if (response.success) {
                    closeModal();
                    window.location.href = '/checklist/';  // checklist/ URL로 리다이렉션
                // TODO: 요청이 성공한 경우에 대한 처리
                } else {
                // TODO: 요청이 실패한 경우에 대한 처리
                }
            } else {
                // TODO: 요청이 실패한 경우에 대한 처리
            }
        }
    };

    // 요청 데이터 설정
    var data = "content=" + encodeURIComponent(content) +
    "&year=" + encodeURIComponent(year) +
    "&month=" + encodeURIComponent(month) +
    "&day=" + encodeURIComponent(day) +
    "&duration=" + encodeURIComponent(duration);

    // 요청 보내기
    xhr.send(data);
}