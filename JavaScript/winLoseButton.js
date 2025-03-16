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
    console.log(winCount)
    console.log(loseCount)
    loseCountElement.textContent = `Losses: ${loseCount}`
    if (loseCount == (winCount * 3)) {
        var liElement = loseCountElement.closest('article');
        liElement.style.display = 'none';
        console.debug("test")
    }
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