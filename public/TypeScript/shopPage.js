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
