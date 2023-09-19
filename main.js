var speed = -30;
var turns = 30;

var bar1 = -30;
var bar2 = 18;

var oil = 30;
var temperature = -18;

var speedContainer = document.getElementById('speed');

var turnsContainer = document.getElementById('turns');

var speedDisplay = document.getElementById('speedtext');

var bar1Container = document.getElementById('bar1');
var bar2Container = document.getElementById('bar2');

var oilContainer = document.getElementById('oil');

var temperatureContainer = document.getElementById('temperature');

function randValues() {
    let newSpeed =  Math.random() * (120 + 30) - 30;
    let newBar1 = Math.random() * (54 - 18) + 18;
    let newBar2 = Math.random() * (6 + 30) - 30;
    let newTurns =  Math.random() * (-46 + 30) + 30;
    let newOil = Math.random() * (-6 - 30) + 30;
    let newTemperature = Math.random() * (-54 + 18) - 18;

    speed = newSpeed;
    bar1 = newBar1;
    bar2 = newBar2;
    turns = newTurns;
    oil = newOil;
    temperature = newTemperature;

    speedContainer.style.transform = `rotate(${speed}deg)`;
    bar1Container.style.transform = `rotate(${bar1}deg)`;
    bar2Container.style.transform = `rotate(${bar2}deg)`;
    turnsContainer.style.transform = `rotate(${turns}deg)`;
    oilContainer.style.transform = `rotate(${oil}deg)`;
    temperatureContainer.style.transform = `rotate(${temperature}deg)`;
}

function refreshSpeed() {
    speedDisplay.innerHTML = Math.floor((speed + 30) * 0.83);
}

setInterval(() => {
    randValues()
    refreshSpeed()
}, 1000);