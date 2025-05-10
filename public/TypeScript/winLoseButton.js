document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.favoritedCharacters').forEach(article => {
        let winCount = 0;
        let loseCount = 0;
        let winPercent = 0;

        const winCountElement = article.querySelector('.win-count');
        const loseCountElement = article.querySelector('.lose-count');
        const winIncreaseButton = article.querySelector('.IncreaseWinBtn');
        const loseIncreaseButton = article.querySelector('.IncreaseLossnBtn');
        const winDecreaseButton = article.querySelector('.DecreaseWinBtn');
        const loseDecreaseButton = article.querySelector('.DecreaseLossBtn');
        const gameCount = article.querySelector('.gameCount');
        const WinRate = article.querySelector('.WinRate');

        winIncreaseButton.addEventListener('click', () => {
            winCount++;
            winCountElement.textContent = `\xA0 ${winCount}`
            gameCount.textContent = `\xA0 ${winCount+loseCount}`
            winPercent = winCount/(winCount+loseCount)
            WinRate.textContent = `\xA0 ${(winPercent*100).toFixed(2)}%`
        });
        winDecreaseButton.addEventListener('click', () =>{
            if (winCount == 0)
            {
                winCount = 0;
            }
            else {
                winCount--;
            }
            gameCount.textContent = `\xA0 ${winCount+loseCount}`
            winCountElement.textContent = `\xA0 ${winCount}`
            winPercent = winCount/(winCount+loseCount)
            WinRate.textContent = `\xA0 ${(winPercent100).toFixed(2)}%`
        });
        loseIncreaseButton.addEventListener('click', () => {
            loseCount++;
            console.log(winCount)
            console.log(loseCount)
            loseCountElement.textContent = `\xA0 ${loseCount}`
            if (loseCount == (winCount * 3)) {
                var liElement = loseCountElement.closest('article');
                liElement.style.display = 'none';
                console.debug("test")
            }
            gameCount.textContent = `\xA0 ${winCount+loseCount}`
            winPercent = winCount/(winCount+loseCount)
            WinRate.textContent = `\xA0 ${(winPercent*100).toFixed(2)}%`
        });
        loseDecreaseButton.addEventListener('click', () =>{
            if (loseCount == 0)
            {
                loseCount = 0;
            }
            else {
                loseCount--;
            }
            gameCount.textContent = `\xA0 ${winCount+loseCount}`
                loseCountElement.textContent = `\xA0 ${loseCount}`
            winPercent = winCount/(winCount+loseCount)
            WinRate.textContent = `\xA0 ${(winPercent*100).toFixed(2)}%`
        });
    })
})