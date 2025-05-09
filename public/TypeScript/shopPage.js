const carousel = document.getElementById('carousel');
const nextBtn = document.getElementById('carouselNextBtn');
const prevBtn = document.getElementById('carouselPrevBtn');

const scrollAmount = 270; // Width of one card + gap

nextBtn.addEventListener('click', () => {
  carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
});

prevBtn.addEventListener('click', () => {
  carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
});
