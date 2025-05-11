const hamburgerBtn = document.getElementById('hamburgerBtn');
const navLinksContainer = document.getElementById('navLinksContainer');

hamburgerBtn.addEventListener('click', () => {
  navLinksContainer.classList.toggle('show');
});