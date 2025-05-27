document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".editBtn").forEach(btn => {
        btn.addEventListener("click", async function() {

            const field = btn.dataset.field;
            let input = document.getElementById(field);

            if (input.tagName === "SELECT") {
                input.disabled = false;
                input.focus();
                input.addEventListener("change", async function handler() {
                    await updateField(field, input.value);
                    input.disabled = true;
                    input.removeEventListener("change", handler)
                });
            } else {
                input.disabled = false;
                input.focus();
                input.addEventListener("blur", async function handler() {
                    await updateField(field, input.value);
                    input.disabled = true;
                    input.removeEventListener("blur", handler)
                });
            }
        });
    });
    async function updateField(field, value) {
        const response = await fetch("/Accountpage/updateField", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ field, value })
        });
        const result = await response.json();
        alert(result.message);    
    }
});

