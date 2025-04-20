"use strict";
function getElement(id) {
    const el = document.getElementById(id);
    if (!el)
        throw new Error(`Element with ID "${id}" not found`);
    return el;
}
const winCountElement = getElement('win-count');
const loseCountElement = getElement('lose-count');
const winIncreaseButton = getElement('IncreaseWinBtn1');
const loseIncreaseButton = getElement('IncreaseLossnBtn1');
const winDecreaseButton = getElement('DecreaseWinBtn1');
const loseDecreaseButton = getElement('DecreaseLossBtn1');
const gameCount = getElement('gameCount');
const WinRate = getElement('WinRate');
let winCount = 0;
let loseCount = 0;
function updateStats() {
    const totalGames = winCount + loseCount;
    const winPercent = totalGames > 0 ? winCount / totalGames : 0;
    winCountElement.textContent = `\xA0 ${winCount}`;
    loseCountElement.textContent = `\xA0 ${loseCount}`;
    gameCount.textContent = `\xA0 ${totalGames}`;
    WinRate.textContent = `\xA0 ${(winPercent * 100).toFixed(2)}`;
}
winIncreaseButton.addEventListener("click", () => {
    winCount++;
    updateStats();
});
winDecreaseButton.addEventListener('click', () => {
    if (winCount == 0) {
        winCount = 0;
    }
    else {
        winCount--;
    }
    ;
    updateStats();
});
loseIncreaseButton.addEventListener('click', () => {
    if (loseCount == (winCount * 3)) {
        const parentArticle = loseCountElement.closest('article');
        if (parentArticle) {
            parentArticle.style.display = 'none';
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
});
