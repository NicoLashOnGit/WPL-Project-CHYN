// Get the button element by its ID
const blacklistBtn = document.getElementById("blacklistBtn");

// Add an event listener to the button to listen for the 'click' event
blacklistBtn.addEventListener("click", function() {
  // Get the image element inside the button
  const imgElement = blacklistBtn.querySelector("img");

  // Check the current image and toggle it
  if (imgElement.src.includes("blackEmptyFavouriteStar.png")) {
    // Change to the filled version of the star
    imgElement.src = "/Images/ButtonImages/FilledGoldFavouriteStar.png";
  } else {
    // Change back to the empty version
    imgElement.src = "/Images/ButtonImages/blackEmptyFavouriteStar.png";
  }
});
