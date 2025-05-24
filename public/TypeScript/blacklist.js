function setupBlacklistButtons() {
    document.querySelectorAll(".blacklistForm").forEach(function(form) {
        form.addEventListener("submit", async function(e) {
            e.preventDefault();
            const name = form.dataset.name;
            const image = form.dataset.image;
            const reason = prompt("Waarom wil je dit karakter op de blacklist zetten?")
            if (!reason) return;

            const response = await fetch("/blacklist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, image, reason})
            });

            const result = await response.json();
            alert(result.message)

            form.closest("article").remove();
        });
    });
}

document.addEventListener("DOMContentLoaded", setupBlacklistButtons);