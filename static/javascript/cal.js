// 현재 날짜 가져오는 Date 객체 생성
let date = new Date();

const renderCalendar = () => {
    const viewYear = date.getFullYear(); // 현재 년도 가져오기
    const viewMonth = (date.getMonth() + 1).toString().padStart(2, '0'); // 현재 월 가져오기, 2자리로 변환
    const monthNames = [
        // 월 영문 이름 배열
        'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
        'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
    ];
    const monthText = monthNames[date.getMonth()]; // 현재 월의 영문 이름 가져오기

    document.querySelector('.year-month').textContent = `${viewYear}.`;
    document.querySelector('.year-month2').textContent = `.${viewMonth}`;
    document.querySelector('.go-today').textContent = `${monthText}`;

    const prevLast = new Date(viewYear, viewMonth - 1, 0); // 이전 달의 마지막 날짜 가져오기
    const thisLast = new Date(viewYear, viewMonth, 0); // 현재 달의 마지막 날짜 가져오기

    const PLDate = prevLast.getDate(); // 이전 달 마지막 날짜
    const PLDay = prevLast.getDay(); // 이전 달 마지막 날짜의 요일

    const TLDate = thisLast.getDate(); // 현재 달 마지막 날짜
    const TLDay = thisLast.getDay(); // 현재 달 마지막 날짜의 요일

    const prevDates = [];
    const thisDates = [...Array(TLDate + 1).keys()].slice(1);
    const nextDates = [];

    // 이전 달의 날짜들이 담긴 배열
    if (PLDay !== 6) {
        for (let i = 0; i < PLDay + 1; i++) {
            prevDates.unshift(PLDate - i);
        }
    }

    // 다음 달의 날짜들이 담긴 배열
    for (let i = 1; i < 7 - TLDay; i++) {
        nextDates.push(i);
    }

    // 날짜 배열 합침
    const dates = prevDates.concat(thisDates, nextDates);
    const firstDateIndex = dates.indexOf(1);
    const lastDateIndex = dates.lastIndexOf(TLDate);

    dates.forEach((date, i) => {
        const condition = i >= firstDateIndex && i < lastDateIndex + 1 ? 'this' : 'other';
        dates[i] = `<div class="date"><span class="${condition}">${date}</span></div>`;
    });

    document.querySelector('.dates').innerHTML = dates.join('');

    const today = new Date();
    if (
        viewMonth === (today.getMonth() + 1).toString().padStart(2, '0') &&
        viewYear === today.getFullYear()
    ) {
        // 현재 달에 해당하는 모든 요소에 today-hover 클래스 추가
        const thisDates = document.querySelectorAll('.this');
        for (let date of thisDates) {
            date.parentElement.classList.add('today-hover');
        }

        // 현재 날짜와 일치하는 요소에 today 클래스 추가
        for (let date of thisDates) {
            if (+date.innerText === today.getDate()) {
                date.classList.add('today');
                break;
            }
        }
    }
};

renderCalendar();

const prevMonth = () => {
    date.setDate(1);
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
};

const nextMonth = () => {
    date.setDate(1);
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
};


const modalContainer = document.getElementById("modal");
const modalContent = document.querySelector(".modal-content");

function openModal() {
    modalContainer.style.display = "flex";
}

function closeModal() {
    modalContainer.style.display = "none";
}

modalContent.addEventListener("click", function (event) {
    event.stopPropagation(); // 이벤트 전파 중단
});

window.addEventListener("load", function () {
    modalContainer.style.display = "none";
});


//모달 안의 달력 -> 기존 html꺼 복사해오려고 했는데, 이전 달과 다음 달로 넘어가는 버튼에서 문제 생겨서 그냥 새로 만들어줬습니다.
let calendarDate = new Date();

const modalrenderCalendar = () => {
    const viewYear = calendarDate.getFullYear(); // 현재 년도 가져오기
    const viewMonth = (calendarDate.getMonth() + 1).toString().padStart(2, '0'); // 현재 월 가져오기, 2자리로 변환
    const monthNames = [
        // 월 영문 이름 배열
        'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
        'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
    ];
    const monthText = monthNames[calendarDate.getMonth()]; // 현재 월의 영문 이름 가져오기

    document.querySelector('.modal-year-month').textContent = `${viewYear}.`;
    document.querySelector('.modal-year-month2').textContent = `.${viewMonth}`;
    document.querySelector('.modal-go-today').textContent = `${monthText}`;

    const prevLast = new Date(viewYear, viewMonth - 1, 0); // 이전 달의 마지막 날짜 가져오기
    const thisLast = new Date(viewYear, viewMonth, 0); // 현재 달의 마지막 날짜 가져오기

    const PLDate = prevLast.getDate(); // 이전 달 마지막 날짜
    const PLDay = prevLast.getDay(); // 이전 달 마지막 날짜의 요일

    const TLDate = thisLast.getDate(); // 현재 달 마지막 날짜
    const TLDay = thisLast.getDay(); // 현재 달 마지막 날짜의 요일

    const prevDates = [];
    const thisDates = [...Array(TLDate + 1).keys()].slice(1);
    const nextDates = [];

    // 이전 달의 날짜들이 담긴 배열
    if (PLDay !== 6) {
        for (let i = 0; i < PLDay + 1; i++) {
            prevDates.unshift(PLDate - i);
        }
    }

    // 다음 달의 날짜들이 담긴 배열
    for (let i = 1; i < 7 - TLDay; i++) {
        nextDates.push(i);
    }

    // 날짜 배열 합침
    const dates = prevDates.concat(thisDates, nextDates);
    const firstDateIndex = dates.indexOf(1);
    const lastDateIndex = dates.lastIndexOf(TLDate);

    dates.forEach((date, i) => {
        const condition = i >= firstDateIndex && i < lastDateIndex + 1 ? 'modal-this' : 'modal-other';
        dates[i] = `<div class="modaldate"><span class="${condition}">${date}</span></div>`;
    });

    document.querySelector('.modaldates').innerHTML = dates.join('');

    const today = new Date();
    if (
        viewMonth === (today.getMonth() + 1).toString().padStart(2, '0') &&
        viewYear === today.getFullYear()
    ) {
        // 현재 달에 해당하는 모든 요소에 today-hover 클래스 추가
        const thisDates = document.querySelectorAll('.modal-this');
        for (let date of thisDates) {
            date.parentElement.classList.add('modal-today-hover');
        }

        // 현재 날짜와 일치하는 요소에 today 클래스 추가
        for (let date of thisDates) {
            if (+date.innerText === today.getDate()) {
                date.classList.add('modal-today');
                break;
            }
        }
    }
};

modalrenderCalendar();

const prevMonth2 = () => {
    calendarDate.setDate(1);
    calendarDate.setMonth(calendarDate.getMonth() - 1);
    modalrenderCalendar();
};

const nextMonth2 = () => {
    calendarDate.setDate(1);
    calendarDate.setMonth(calendarDate.getMonth() + 1);
    modalrenderCalendar();
};
