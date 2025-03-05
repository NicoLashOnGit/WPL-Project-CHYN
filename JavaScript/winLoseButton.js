const winCountElement = document.getElementById('win-count');
const loseCountElement = document.getElementById('lose-count');
const winButton = document.getElementById('win-button');
const loseButton = document.getElementById('lose-button');

let winCount = 0;
let loseCount = 0;

winButton.addEventListener('click', () => {
    winCount++;
    winCountElement.textContent = `Wins: ${winCount}`
});

loseButton.addEventListener('click', () => {
    loseCount++;
    loseCountElement.textContent = `Losses: ${loseCount}`
});