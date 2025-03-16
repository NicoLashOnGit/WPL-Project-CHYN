const winCountElement = document.getElementById('win-count');
const loseCountElement = document.getElementById('lose-count');
const winIncreaseButton = document.getElementById('IncreaseWinBtn1');
const loseIncreaseButton = document.getElementById('IncreaseLossnBtn1');
const winDecreaseButton = document.getElementById('DecreaseWinBtn1')
const loseDecreaseButton = document.getElementById('DecreaseLossBtn1')

let winCount = 0;
let loseCount = 0;

winIncreaseButton.addEventListener('click', () => {
    winCount++;
    winCountElement.textContent = `Wins: ${winCount}`
});
winDecreaseButton.addEventListener('click', () =>{
    if (winCount == 0)
    {
        winCount = 0;
    }
    else {
        winCount--;
    }
        winCountElement.textContent = `Wins: ${winCount}`
});

loseIncreaseButton.addEventListener('click', () => {
    loseCount++;
    loseCountElement.textContent = `Losses: ${loseCount}`
});
loseDecreaseButton.addEventListener('click', () =>{
    if (loseCount == 0)
    {
        loseCount = 0;
    }
    else {
        loseCount--;
    }
        loseCountElement.textContent = `Losses: ${loseCount}`
});