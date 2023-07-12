function toggleLikeIcon() {
    var icon = document.getElementById("icon1");

    if (icon.classList.contains("fa-chevron-down")) {
        icon.classList.remove("fa-chevron-down");
        icon.classList.add("fa-chevron-up");
    } else {
        icon.classList.remove("fa-chevron-up");
        icon.classList.add("fa-chevron-down");
    }
}

function toggleCommentIcon() {
    var icon = document.getElementById("icon2");

    if (icon.classList.contains("fa-chevron-down")) {
        icon.classList.remove("fa-chevron-down");
        icon.classList.add("fa-chevron-up");
    } else {
        icon.classList.remove("fa-chevron-up");
        icon.classList.add("fa-chevron-down");
    }
}

function toggleCommentIcon() {
    var commentList = document.getElementById("comment-list");
    var icon = document.getElementById("icon2");

    if (commentList.style.display === "none") {
        commentList.style.display = "block";
        icon.classList.remove("fa-chevron-down");
        icon.classList.add("fa-chevron-up");
    } else {
        commentList.style.display = "none";
        icon.classList.remove("fa-chevron-up");
        icon.classList.add("fa-chevron-down");
    }
}

function toggleDropdown() {
    var dropdownOptions = document.getElementById("dropdown-options");

    if (dropdownOptions.style.display === "none") {
        dropdownOptions.style.display = "block";
    } else {
        dropdownOptions.style.display = "none";
    }
}

// function editOption() {
//     // 수정 옵션을 선택했을 때 동작
//     console.log("수정하기 선택");
// }

function deleteOption() {
    // 삭제 옵션을 선택했을 때 동작
    console.log("삭제하기 선택");
}

function comment_toggleDropdown() {
    var dropdownOptions = document.getElementById("comment_dropdown-options");

    if (dropdownOptions.style.display === "none") {
        dropdownOptions.style.display = "block";
    } else {
        dropdownOptions.style.display = "none";
    }
}

function comment_editOption() {
    // 수정 옵션을 선택했을 때 동작
    console.log("수정하기 선택");
}

function comment_deleteOption() {
    // 삭제 옵션을 선택했을 때 동작
    console.log("삭제하기 선택");
}