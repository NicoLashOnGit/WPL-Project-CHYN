let currentCharacter = null;
let cosmeticSlot = null;

const userPurchases = JSON.parse(document.getElementById("userPurchasesData").textContent);
function openCosmeticPopup(characterName, slot) {
    currentCharacter = characterName;
    cosmeticSlot = slot;

    const container = document.getElementById("cosmeticOptions");
    container.innerHTML = "";

    userPurchases.forEach(item => {
      const img = document.createElement("img");
      img.src = item.image;
      img.style.width = "100px";
      img.style.cursor = "pointer";
      img.style.margin = "5px";
      img.alt = item.name || "";
      img.title = item.name || "";

      img.onclick = () => {
        selectCosmetic(item.image);
      };

      container.appendChild(img);
    });

    document.getElementById("cosmeticPopup").style.display = "block";
}

let selectedCosmetics = { 1: null, 2: null };

function selectCosmetic(imageUrl) {
    selectedCosmetics[cosmeticSlot] = imageUrl;

    const container = document.getElementById("cosmeticOptions");
    [...container.children].forEach(img => {
      img.style.border = (img.src === imageUrl) ? "3px solid blue" : "none";
    });
}

async function saveCosmeticSelection() {
    if (!currentCharacter) {
        alert("Geen character geselecteerd");
        return;
    }
    const dataToSend = { name: currentCharacter };
    dataToSend[`cosmetic${cosmeticSlot}`] = selectedCosmetics[cosmeticSlot];

    try {
      const res = await fetch("/favoritePage/updateCosmetics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToSend)
      });

      if (res.ok) {
        document.getElementById("cosmeticPopup").style.display = "none";
        location.reload();
      } else {
        alert("Fout bij opslaan van cosmetic");
      }
    } catch (e) {
      alert("Fout bij verbinden met server");
      console.error(e);
    }
}
