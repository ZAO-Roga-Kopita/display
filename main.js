var speed = -30;
var turns = 30;

var speedContainer = document.getElementById('speed');
var turnsContainer = document.getElementById('turns');
var speedDisplay = document.getElementById('speedtext')
function randspeed() {
    let newSpeed =  Math.random() * (120 + 30) - 30;
    speed = newSpeed;

    speedContainer.style.transform = `rotate(${speed}deg)`
}

function randturns() {
    let newTurns =  Math.random() * (-46 + 30) + 30;
    turns = newTurns;

    turnsContainer.style.transform = `rotate(${turns}deg)`
}

function refreshSpeed() {
    speedDisplay.innerHTML = Math.floor(speed) + 30;
}

setInterval(() => {
    randspeed()
    refreshSpeed()
    randturns()
}, 1000);