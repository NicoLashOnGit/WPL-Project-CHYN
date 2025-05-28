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

document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".favouriteForm").forEach(form => {
        form.addEventListener("submit", async function(e) {
            e.preventDefault();
            const name = form.dataset.name;
            const image = form.dataset.image;

            const response = await fetch("/favourite", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, image })
            });

            const result = await response.json();
            alert(result.message); // Show the pop-up with the server message
        });
    });
});