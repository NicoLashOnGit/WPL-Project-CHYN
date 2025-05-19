document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".searchBar");
    const input = document.getElementById("searchBar");

    form.addEventListener("submit", async(e) => {
        e.preventDefault();
        const query = input.ariaValueMax.trim().toLowerCase();
        if (!query) return;

        window.location.href = `/CharacterInfo?name=${encodeURIComponent(query)}`;
    });
});