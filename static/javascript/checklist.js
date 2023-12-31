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

//모달 내에서 날짜 선택
function updateDayOptions() {
    var yearSelect = document.getElementById("year");
    var monthSelect = document.getElementById("month");
    var daySelect = document.getElementById("day");

    var selectedYear = yearSelect.value;
    var selectedMonth = monthSelect.value;

    // 일 수 계산
    var dateObj = new Date(selectedYear, selectedMonth, 0);
    var daysInMonth = dateObj.getDate(); // 선택한 월의 일 수

    // 일 수 업데이트
    daySelect.innerHTML = "";
    for (var i = 1; i <= daysInMonth; i++) {
        var dayValue = (i < 10) ? "0" + i : i; //2자리로 날짜 변환
        var dayOption = new Option(i + "일", dayValue);
        daySelect.appendChild(dayOption);
    }
}

// 현재 날짜로 초기 값 지정
window.onload = function () {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear().toString();
    var currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    var currentDay = currentDate.getDate().toString().padStart(2, "0");

    document.getElementById("year").value = currentYear;
    document.getElementById("month").value = currentMonth;

    updateDayOptions();
    document.getElementById("day").value = currentDay;
};

//체크리스트 화면에서 이사 전 클릭 이벤트
document.addEventListener('DOMContentLoaded', function () {
    const checkboxes = document.querySelectorAll('.checkbox > .first_checkbox');
    checkboxes.forEach(function (checkbox) {
        const editBtn = checkbox.querySelector('.editBtn1');
        const removeBtn = checkbox.querySelector('.removeBtn1');
        const editIcon = editBtn.querySelector('.fa-pen');
        const removeIcon = removeBtn.querySelector('.fa-x');
        const checkboxText = checkbox.querySelector('.first_checkbox_text');
        const checkIcon = checkbox.querySelector('.fa-square');
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
                checkIcon.classList.remove('fa-square');
                checkIcon.classList.add('fa-square-check');
                checkIcon.style.color = '#FFFFFF';
                checkIcon.style.fontSize = '1.5rem';
            } else {
                checkbox.style.background = '#FFFFFF';
                editBtn.style.background = '#FFFFFF';
                removeBtn.style.background = '#FFFFFF';
                editIcon.style.color = '#000000';
                removeIcon.style.color = '#000000';
                checkboxText.style.color = '#000000';
                checkIcon.classList.remove('fa-square-check');
                checkIcon.classList.add('fa-square');
                checkIcon.style.color = '#000000';
                checkIcon.style.fontSize = '';
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


//체크리스트 화면에서 이사 중 클릭 이벤트
document.addEventListener('DOMContentLoaded', function () {
    const checkboxes = document.querySelectorAll('.checkbox > .second_checkbox');
    checkboxes.forEach(function (checkbox) {
        const editBtn = checkbox.querySelector('.editBtn2');
        const removeBtn = checkbox.querySelector('.removeBtn2');
        const editIcon = editBtn.querySelector('.fa-pen');
        const removeIcon = removeBtn.querySelector('.fa-x');
        const checkboxText = checkbox.querySelector('.second_checkbox_text');
        const checkIcon = checkbox.querySelector('.fa-square');
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
                checkIcon.classList.remove('fa-square');
                checkIcon.classList.add('fa-square-check');
                checkIcon.style.color = '#FFFFFF';
                checkIcon.style.fontSize = '1.5rem';
            } else {
                checkbox.style.background = '#FFFFFF';
                editBtn.style.background = '#FFFFFF';
                removeBtn.style.background = '#FFFFFF';
                editIcon.style.color = '#000000';
                removeIcon.style.color = '#000000';
                checkboxText.style.color = '#000000';
                checkIcon.classList.remove('fa-square-check');
                checkIcon.classList.add('fa-square');
                checkIcon.style.color = '#000000';
                checkIcon.style.fontSize = '';
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

//체크리스트 화면에서 이사 후 클릭 이벤트
document.addEventListener('DOMContentLoaded', function () {
    const checkboxes = document.querySelectorAll('.checkbox > .third_checkbox');
    checkboxes.forEach(function (checkbox) {
        const editBtn = checkbox.querySelector('.editBtn3');
        const removeBtn = checkbox.querySelector('.removeBtn3');
        const editIcon = editBtn.querySelector('.fa-pen');
        const removeIcon = removeBtn.querySelector('.fa-x');
        const checkboxText = checkbox.querySelector('.third_checkbox_text');
        const checkIcon = checkbox.querySelector('.fa-square');
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
                checkIcon.classList.remove('fa-square');
                checkIcon.classList.add('fa-square-check');
                checkIcon.style.color = '#FFFFFF';
                checkIcon.style.fontSize = '1.5rem';
            } else {
                checkbox.style.background = '#FFFFFF';
                editBtn.style.background = '#FFFFFF';
                removeBtn.style.background = '#FFFFFF';
                editIcon.style.color = '#000000';
                removeIcon.style.color = '#000000';
                checkboxText.style.color = '#000000';
                checkIcon.classList.remove('fa-square-check');
                checkIcon.classList.add('fa-square');
                checkIcon.style.color = '#000000';
                checkIcon.style.fontSize = '';
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

// let clicked1 = false;
// let clicked2 = false;
// let clicked3 = false;

//모달에서 이사전 버튼 클릭 이벤트
// document.addEventListener('DOMContentLoaded', function () {
//     const checkbox = document.querySelector('.modal >.checkboxContainer> #item1');

//     checkbox.addEventListener('click', function () {
//         clicked1 = !clicked1;

//         if (clicked1 && !clicked2 && !clicked3) {
//             this.style.background = '#5377FF';
//         } else {
//             this.style.background = '#FFFFFF';
//         }
//     });
// });

// //모달에서 이사중 버튼 클릭 이벤트
// document.addEventListener('DOMContentLoaded', function () {
//     const checkbox = document.querySelector('.modal >  .checkboxContainer> #item2');

//     checkbox.addEventListener('click', function () {
//         clicked2 = !clicked2;

//         if (!clicked1 && clicked2 && !clicked3) {
//             this.style.background = '#5377FF';
//         } else {
//             this.style.background = '#FFFFFF';
//         }
//     });
// });

// //모달에서 이사후 버튼 클릭 이벤트
// document.addEventListener('DOMContentLoaded', function () {
//     const checkbox = document.querySelector('.modal > .checkboxContainer> #item3');

//     checkbox.addEventListener('click', function () {
//         clicked3 = !clicked3;

//         if (!clicked1 && !clicked2 && clicked3) {
//             this.style.background = '#5377FF';
//         } else {
//             this.style.background = '#FFFFFF';
//         }
//     });
// });

var selectedCheckbox = null;
function toggleCheckbox(id) {
    var checkbox = document.getElementById(id);

    if (selectedCheckbox !== checkbox) {
        if (selectedCheckbox) {
            selectedCheckbox.classList.remove("active");
        }
        checkbox.classList.add("active");
        selectedCheckbox = checkbox;
    } else {
        checkbox.classList.remove("active");
        selectedCheckbox = null;
    }
    //출력
    var checkboxes = document.getElementsByClassName("checkbox_period");

    // 해당 id 아니면 다 비활성화 
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i] !== checkbox) {
            checkboxes[i].classList.remove("active");
        }
    }

    for (var i = 0; i < checkboxes.length; i++) {
        var checkbox = checkboxes[i];
        var isActive = checkbox.classList.contains("active");

        if (isActive) {
            // 해당 요소는 active 상태입니다
            //console.log(checkbox.id + " is active");
            checkbox.style.background = '#5377FF';
        } else {
            // 해당 요소는 active 상태가 아닙니다
            //console.log(checkbox.id + " is not active");
            checkbox.style.background = '#FFFFFF'
        }
    }
}

// 모달에서 data 전달하기 
function createData(id){
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

    if (id) {
        console.log(id)
        // schedule 수정
        // AJAX 요청 보내기
        var xhr = new XMLHttpRequest();
        var url = "edit/" + id + "/"; // 수정할 schedule의 ID를 포함한 URL
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
    }
    else{
        // schedule 생성
        // AJAX 요청 보내기
        var xhr = new XMLHttpRequest();
        var url = "create_schedule/"; // 요청을 처리할 URL
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
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
    }
    
        // 요청 데이터 설정
        var data = "content=" + encodeURIComponent(content) +
        "&year=" + encodeURIComponent(year) +
        "&month=" + encodeURIComponent(month) +
        "&day=" + encodeURIComponent(day) +
        "&duration=" + encodeURIComponent(duration);

        xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
        // 요청 보내기
        xhr.send(data);
}

function getCookie(name) {
    var cookieArr = document.cookie.split(";");

    for (var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");

        if (name === cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }

    return null;
}
