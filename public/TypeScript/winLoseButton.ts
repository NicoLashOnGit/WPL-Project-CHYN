function getElement<T extends HTMLElement>(id: string): T {
    const el = document.getElementById(id);
    if (!el) throw new Error(`Element with ID "${id}" not found`);
    return el as T;
}

const winCountElement = getElement<HTMLSpanElement>('win-count');
const loseCountElement = getElement<HTMLSpanElement>('lose-count');
const winIncreaseButton = getElement<HTMLButtonElement>('IncreaseWinBtn1');
const loseIncreaseButton = getElement<HTMLButtonElement>('IncreaseLossnBtn1');
const winDecreaseButton = getElement<HTMLButtonElement>('DecreaseWinBtn1');
const loseDecreaseButton = getElement<HTMLButtonElement>('DecreaseLossBtn1');
const gameCount = getElement<HTMLSpanElement>('gameCount');
const WinRate = getElement<HTMLSpanElement>('WinRate');

let winCount = 0;
let loseCount = 0;

function updateStats(): void {
    const totalGames = winCount + loseCount;
    const winPercent = totalGames > 0 ? winCount / totalGames : 0;

    winCountElement.textContent = `\xA0 ${winCount}`
    loseCountElement.textContent = `\xA0 ${loseCount}`
    gameCount.textContent = `\xA0 ${totalGames}`
    WinRate.textContent = `\xA0 ${(winPercent*100).toFixed(2)}`
}

winIncreaseButton.addEventListener("click", () => {
    console.log("Win button clicked")
    winCount++;
    updateStats();
});

winDecreaseButton.addEventListener('click', () => {
    if (winCount == 0) {
        winCount = 0;
    }
    else {
        winCount--;
    };
    updateStats();
});

loseIncreaseButton.addEventListener('click', () => {
    if (loseCount == (winCount * 3)) {
        const parentArticle = loseCountElement.closest('article');
        if (parentArticle) {
            parentArticle.style.display = 'none'
        }
    }
    updateStats();
});

loseDecreaseButton.addEventListener('click', () => {
    if (loseCount == 0) {
        loseCount = 0;
    }
    else {
        loseCount--;
    }
    updateStats();
})