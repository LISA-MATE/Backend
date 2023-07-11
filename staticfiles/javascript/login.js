const saveUser = document.getElementById("saveUser");
const saveLogin = document.getElementById("saveLogin");

saveUser.addEventListener("click", function () {
    saveLogin.checked = !saveLogin.checked;
});