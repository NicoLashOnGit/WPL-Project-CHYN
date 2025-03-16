const winCountElement = document.getElementById('win-count');
const loseCountElement = document.getElementById('lose-count');
const winIncreaseButton = document.getElementById('IncreaseWinBtn1');
const loseIncreaseButton = document.getElementById('IncreaseLossnBtn1');
const winDecreaseButton = document.getElementById('DecreaseWinBtn1');
const loseDecreaseButton = document.getElementById('DecreaseLossBtn1');
const gameCount = document.getElementById('gameCount');
const WinRate = document.getElementById('WinRate');

let winCount = 0;
let loseCount = 0;
let winPercent = 0;
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