function setupBlacklistButtons() {
    const blacklistBtns = document.querySelectorAll("#favouriteBtn");
    blacklistBtns.forEach(function(button) {
        button.addEventListener("click", function() {
            const liElement = button.closest('article');
            if (liElement) {
                liElement.style.display = 'none';
            }
            console.debug("test");
        });
    });
}

document.addEventListener("DOMContentLoaded", setupBlacklistButtons);