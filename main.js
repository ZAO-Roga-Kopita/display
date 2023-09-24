signalsIds = [
    'brake_failure', 'park_brake', 'abs', 'stab_ctrl',
    'engine', 'turn_left', 'stop', 'turn_right',
    'warning', 'drl', 'beam_low', 'beam_high',
    'seat_belt', 'asr', 'halt_brake', 'pressure_3',
    'worn_brake', 'ebs', 'pressure_2', 'ect',
    'coolant_heat', 'heater_1', 'cab_heater',
    'mirror_heat', 'window_heat', 'engine_fail',
    'oil_pressure', 'oil_lvl_max', 'combus_preheat',
    'side_light', 'fog_front', 'fog_rear', 'bulb_failure',
    'eng_inlet_air_filter', 'engine_coolant_lvl',
    'steering_fluid_lvl', 'int_illum_1', 'vent_fan_1',
    'cab_fan', 'eng_emiss_system_fail', 'adblue',
    'baby_pram', 'baby_pram1', 'wheelchair',
    'immobile', 'hill_holding', 'retarder_off',
    'hydraulic_drive', 'emergency_hammer', 'extinguisher',
    'tyre_fail', 'return_driver', 'pneumo_1', 'susp_down',
    'susp_dm', 'transmission_failure', 'transmission_temperature', 'transmission_convert_temperature',
    'battery', 'pressure_1', 'diesel'
]

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

for (let i = 0; i < signalsIds.length; i++) {
    document.getElementById(signalsIds[i]).style.opacity = "1.0";
}

function randSignals() {
    let randNumber = Math.floor(Math.random() * signalsIds.length);
    document.getElementById(signalsIds[randNumber]).style.opacity = "1.0";
    for (let i = 0; i < signalsIds.length; i++) {
        if (i !== randNumber) {
            document.getElementById(signalsIds[i]).style.opacity = "0.2";
        }
    }
}

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
    randSignals()
}, 1000)


setInterval(() => {
    randValues()
    refreshSpeed()
}, 1000);