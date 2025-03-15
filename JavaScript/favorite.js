const blacklistBtns = document.querySelectorAll(".characterPageBtns");

blacklistBtns.forEach(function(button) {
  button.addEventListener("click", function() {
    const imgElement = button.querySelector("img");

    if (imgElement.src.includes("blackEmptyFavouriteStar.png")) {
      imgElement.src = "/Images/ButtonImages/FilledGoldFavouriteStar.png";
    } else {
      imgElement.src = "/Images/ButtonImages/blackEmptyFavouriteStar.png";
    }
  });
});
