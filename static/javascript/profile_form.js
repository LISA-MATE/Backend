document.addEventListener('DOMContentLoaded', function () {
    const rephotoButton = document.getElementById('rephoto');
    const imageFileInput = document.getElementById('imageFile1');
    const photoElement = document.querySelector('.photo');

    rephotoButton.addEventListener('click', function () {
        imageFileInput.click();
    });

    imageFileInput.addEventListener('change', function () {
        const selectedFile = imageFileInput.files[0];
        console.log('선택한 파일:', selectedFile.name);

        const reader = new FileReader();
        reader.onload = function (e) {
            const imageDataURL = e.target.result;
            photoElement.style.backgroundImage = `url(${imageDataURL})`;
        };
        reader.readAsDataURL(selectedFile);
    });
});
