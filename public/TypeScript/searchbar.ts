export function search(): void {
    const inputElement = document.getElementById("searchBar") as HTMLInputElement;
    if (!inputElement) {
        console.error("Search bar element is niet gevonden");
        return;
    }

    const input = inputElement.value?.toLowerCase();
    if (!input) {
        console.error("Search input is leeg");
        return;
    }

    const pages: Record<string, string> = {
        "john wick": "/CharacterInfo"
    };

    if (pages[input]){
        window.location.href = pages[input];
    } else {
        console.error("Pagina niet gevonden voor", input);
    }
    
}

document.addEventListener("DOMContentLoaded", () => {
    const searchBarForm = document.querySelector(".searchbar") as HTMLFormElement;
    if (!searchBarForm) {
        console.error("Search bar element is niet gevonden");
        return;
    }

    searchBarForm.addEventListener("submit", (event) => {
        event.preventDefault();
        search();
    });
});