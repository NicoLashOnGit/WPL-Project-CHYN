function favorite() {
  const blacklistBtns = document.querySelectorAll("#blacklistBtn");
  console.log("knop is aangelklingt")
  blacklistBtns.forEach(function(button) {
    button.addEventListener("click", function() {
      const imgElement = button.querySelector("img");
      console.log("knop is aangelklikt")
      if (imgElement?.src.includes("blackEmptyFavouriteStar.png")) {
        imgElement.src = "/Images/ButtonImages/FilledGoldFavouriteStar.png";
      } else if (imgElement?.src.includes("FilledGoldFavouriteStar.png")) {
        imgElement.src = "/Images/ButtonImages/blackEmptyFavouriteStar.png";
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", favorite);