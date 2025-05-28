document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.favoritedCharacters').forEach(article => {
        let winCount = Number(article.dataset.wins) || 0;
        let loseCount = Number(article.dataset.losses) || 0;
        let winPercent = 0;

        const winCountElement = article.querySelector('.win-count');
        const loseCountElement = article.querySelector('.lose-count');
        const winIncreaseButton = article.querySelector('.IncreaseWinBtn');
        const loseIncreaseButton = article.querySelector('.IncreaseLossnBtn');
        const winDecreaseButton = article.querySelector('.DecreaseWinBtn');
        const loseDecreaseButton = article.querySelector('.DecreaseLossBtn');
        const gameCount = article.querySelector('.gameCount');
        const WinRate = article.querySelector('.WinRate');
        const characterName= article.querySelector('.favoriteCharacterNames').textContent.trim();

        function updateStats() {
            gameCount.textContent = `\xA0 ${winCount + loseCount}`
            winCountElement.textContent = `\xA0 ${winCount}`;
            loseCountElement.textContent = `\xA0 ${loseCount}`;
            winPercent = winCount + loseCount > 0 ? winCount / (winCount + loseCount) : 0;
            WinRate.textContent = `\xA0 ${(winPercent * 100).toFixed(2)}%`;

            fetch("/favoritePage/updateStats", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({ name: characterName, wins: winCount, losses: loseCount})
            });
        }

        updateStats();

        winIncreaseButton.addEventListener('click', () => {
            winCount++;
            updateStats();
        });
        winDecreaseButton.addEventListener('click', () => {
            if (winCount > 0) winCount--;
            updateStats();
        });
        loseIncreaseButton.addEventListener('click', () => {
            loseCount++;
            updateStats();
        });
        loseDecreaseButton.addEventListener('click', () => {
            if (loseCount > 0) loseCount--;
            updateStats();
        });
    })
})