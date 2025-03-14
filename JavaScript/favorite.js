const star = document.getElementsByClassName("characterPageBtnImages");
const button = document.getElementById('blacklistBtn');

let isFirstImage = true;

button.addEventListener("click", function() {
    console.log('test')
    if (isFirstImage) {
        star.src = "/Images/ButtonImages/FilledGoldFavouriteStar.png";
    } else {
        star.src = "/Images/ButtonImages/blackEmptyFavouriteStar.png"
    }
    isFirstImage = !isFirstImage
});