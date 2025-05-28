function setupBlacklistEditButtons() {
    document.querySelectorAll("#BlacklistReasonEditBtn").forEach(function(button) {
        button.addEventListener("click", async function(e) {
            e.preventDefault();
            const article = button.closest(".blacklistedCharacters");
            const name = article.querySelector(".blacklistedCharacterNames").textContent.trim();
            const reasonElement = article.querySelector(".blacklistReasons");
            const currentReason = reasonElement.textContent.trim();
            const newReason = prompt("Nieuwe reden voor blacklist:", currentReason);
            if (!newReason || newReason === currentReason) return;

            const response = await fetch("/blacklist/updateReason", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ name, reason: newReason})
            });

            const result = await response.json();
            alert(result.message);

            reasonElement.textContent = newReason;
        });
    });
};

document.addEventListener("DOMContentLoaded", setupBlacklistEditButtons)