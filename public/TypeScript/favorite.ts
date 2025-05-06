export function favorite(): void {
    const blacklistBtns = document.querySelectorAll(".characterPageBtns");

    blacklistBtns.forEach(function(button) {
      button.addEventListener("click", async function() {
        const imgElement = button.querySelector("img");
        const characterId = button.closest(".Characters")?.id;
        
        if (!characterId) {
            console.error("Character ID niet gevonden")
            return;
        }
        
        try {
            const response = await fetch("/Characterpage/toggleFavorite", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({characterId})
            });
        const data = await response.json();

        if (data.succes) {
            if (imgElement?.src.includes("blackEmptyFavouriteStar.png")) {
                imgElement.src = "/Images/ButtonImages/FilledGoldFavouriteStar.png";
              } else {
                if (imgElement) {
                  imgElement.src = "/Images/ButtonImages/blackEmptyFavouriteStar.png";
                }
              }
        } else {
            console.error("Mislukt om Favoriet ster toe te voegen");
        }
        } catch (error) {
            console.error("Mislukt om Favotiet ster te toggelen", error)
        }
      });
    });
};