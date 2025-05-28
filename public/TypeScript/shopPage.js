function setupCarousel(carouselId, prevBtnId, nextBtnId) {
  const carousel = document.getElementById(carouselId);
  const nextBtn = document.getElementById(nextBtnId);
  const prevBtn = document.getElementById(prevBtnId);
  const scrollAmount = 270;

  if (nextBtn && carousel) {
    nextBtn.addEventListener("click", () => {
      carousel.scrollBy({ left: scrollAmount, behavior: 'smooth'});
    });
  }
  if (prevBtn && carousel) {
    prevBtn.addEventListener("click", () => {
      carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth'});
    });
  }
}

setupCarousel("carousel-backpacks", "carouselPrevBtn-backpacks", "carouselNextBtn-backpacks")
setupCarousel("carousel-pickaxes", "carouselPrevBtn-pickaxes", "carouselNextBtn-pickaxes")
setupCarousel("carousel-gliders", "carouselPrevBtn-gliders", "carouselNextBtn-gliders")

document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll('.buyItemForm').forEach(form => {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      const response = await fetch('/buyItem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      alert(result.message || "Onbekende fout");

      // Optional: update vbucks counter or disable button if needed
    });
  });
});