document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.favoriteCharacterCosmeticBtns').forEach(btn => {
        btn.addEventListener('click', function() {
            const article = btn.closest('article');
            const characterName = article.querySelector('.favoriteCharacterNames').textContent.trim();
            const type = btn.getAttribute('data-cosmetic-type');
            const purchases = window.userPurchases || [];
            const items = purchases.filter(item => item.type === type);

            let carouselHtml = `
                <div class="carousel-wrapper" style="display:flex;align-items:center;">
                    <button id="carouselPrevBtn-modal">&lt;</button>
                    <div class="cosmetic-carousel" id="carousel-modal" style="flex:1;">
                        ${items.map(item => 
                            `<img src="${item.image}" alt="${item.name}" class="selectable-cosmetic" data-cosmetic-image="${item.image}" style="cursor:pointer;">`
                        ).join('')}
                    </div>
                    <button id="carouselNextBtn-modal">&gt;</button>
                </div>
            `;

            document.getElementById('carouselModalContent').innerHTML = carouselHtml;
            document.getElementById('cosmeticCarouselOverlay').style.display = 'flex';

            if (typeof setupCarousel === "function") {
                setupCarousel("carousel-modal", "carouselPrevBtn-modal", "carouselNextBtn-modal");
            }

            document.querySelectorAll('.selectable-cosmetic').forEach(img => {
                img.addEventListener('click', async function() {
                    const cosmeticImage = img.getAttribute('data-cosmetic-image');
                    let payload = { name: characterName };
                    if (type === "backpack") payload.cosmetic1 = cosmeticImage;
                    if (type === "pickaxe") payload.cosmetic2 = cosmeticImage;
                    if (type === "glider") payload.cosmetic3 = cosmeticImage;

                    const res = await fetch('/favoritePage/updateCosmetics', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });
                    const result = await res.json();

                    btn.querySelector('img').src = cosmeticImage;

                    document.getElementById('cosmeticCarouselOverlay').style.display = 'none';
                    document.getElementById('carouselModalContent').innerHTML = "";

                    if(result && result.message) alert(result.message);
                });
            });
        });
    });

    document.getElementById('closeCarouselModal').addEventListener('click', function() {
        document.getElementById('cosmeticCarouselOverlay').style.display = 'none';
        document.getElementById('carouselModalContent').innerHTML = "";
    });
    document.getElementById('cosmeticCarouselOverlay').addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.display = 'none';
            document.getElementById('carouselModalContent').innerHTML = "";
        }
    });
});