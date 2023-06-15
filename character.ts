import { getData, capitalize, display, getEl} from './modules/util/util.js'
import { getClassIndex, getRaceIndex, getElementIndex } from './modules/getIndex.js'
import { getClassStats, getRaceStats, getCombinedStats } from './modules/getStats.js'
import formSubmit from './modules/form.js'
import GameData from './modules/util/GameData.js';
// import { getCsf, getRsf } from './modules/getSf.js'

// Stats = [hp, tp, str, int, agi]

let gameData: GameData;

// 
// Retrieve Local Storage
// 

window.addEventListener("DOMContentLoaded", function(e) {
    let charName: string | null = localStorage.getItem("characterName");
    let charClass: string | null = localStorage.getItem("characterClass");
    let charRace: string | null = localStorage.getItem("characterRace");
    let charElement: string | null = localStorage.getItem("characterElement");

    if(charName && charClass && charRace && charElement) {
        let charChoices: string[] = [charName, charClass, charRace, charElement];
        console.log(charName);
        console.log(charClass);
        console.log(charRace);
        console.log(charElement);
    
        // Begins the process of requesting the JSON data.
        getData('gameData.json', onLoad, charChoices)
    }    
  })
  
  // Runs when data loads from JSON file
  function onLoad(data: GameData, charChoices: string[]) {
    gameData = data;
    console.log('charChoices: ')
    console.log(charChoices);

    let nameField: HTMLInputElement = <HTMLInputElement> document.getElementById('nameField');

    // Initially set chart data only if input data is already there (checks name field)
    if (nameField.value.length !== 0) {
        let classChoice = charChoices[1];
        let raceChoice = charChoices[2];
        // let elementChoice = charChoices[3];
        // checkRadios(classChoice, raceChoice, elementChoice);
        setChartData(gameData, classChoice, raceChoice);
    }
    
    // setChartData(gameData, checkClass, checkRace)
  }

//   function checkRadios(classChoice, raceChoice, elementChoice) {
//       if(classChoice && raceChoice && elementChoice) {
//         const classBtn = document.getElementById(classChoice);
//         const raceBtn = document.getElementById(raceChoice);
//         const elementBtn = document.getElementById(elementChoice);

//         console.log('radio buttons:')
//         console.log(classBtn)
//         console.log(raceBtn)
//         console.log(elementBtn)

//         classBtn.checked = true;
//         raceBtn.checked = true;
//         elementBtn.checked = true;
//       }
//   }

// 
// Stats Chart
// 

//   Chart Setup
const radarData = {
    labels: [
        'Max HP',
        'Max TP',
        'STR',
        'INT',
        'AGI',
    ],
    datasets: [{
        label: 'Class Stats',
        data: [10, 10, 10, 10, 10],
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
    }, {
        label: '+ Race Modifiers',
        data: [11, 11, 11, 11, 11],
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)'
    }]
};

// Chart Config
const config = {
    type: 'radar',
    data: radarData,
    options: {
        elements: {
            line: {
                borderWidth: 3
            }
        },
        scales: {
            r: {
                pointLabels: {
                    display: true,
                    font: {
                        size: 18
                    }
                },
                ticks: {
                    display: false
                },
                suggestedMin: 5,
                suggestedMax: 130
            }
        },
        plugins: {
            tooltip: {
                // Disable the on-canvas tooltip
                enabled: false
            }
        }
    }
};

// Display Chart
const myChart = new Chart(
    document.getElementById('statsChart'),
    config
);

// 
// //
// Chart Data Management
// //
// 

// 
// Stat High Calculation
// 

// Calculate combined stat high for a specific stat.
let getStatHigh = function(gameData, statIndex) {
    if (gameData) {
        let baseStats = gameData.baseStats;
        let statMods = gameData.statMods;
        let classStats = [];
        let raceStats = [];
        // Base Stats class loop
        for (let i = 0; i < baseStats.length; i++) {
            classStats.push(baseStats[i][statIndex]);
        }
        // Stat Mods race loop
        for (let i = 0; i < statMods.length; i++) {
            raceStats.push(statMods[i][statIndex]);
        }
        
        let maxClassStat = Math.max(...classStats);
        let maxRaceStat = Math.max(...raceStats);

        let statHigh = maxClassStat + maxRaceStat;

        return statHigh;
    }
    else {
        console.log('Error- Game Data is not loaded.')
    }
}

// Calculate and return the highest possible starting stat values
let getStatHighs = function(gameData: GameData) {
    if(gameData) {
        // Make array of the highest possible starting stat values
        let highStats = Array.of(getStatHigh(gameData, 0), getStatHigh(gameData, 1), getStatHigh(gameData, 2), getStatHigh(gameData, 3), getStatHigh(gameData, 4));
        return highStats;
    }
    else {
        console.log('Error- Game Data is not loaded.')
    }
}

// 
// Stat Percent Calculation
// 

//  Calculate the stat percent for a single stat (for a specified class)
let getStatPercent = function(gameData: GameData, classIndex: number, statIndex: number) {
    if(gameData) {
        let classStat = gameData.baseStats[classIndex][statIndex];
        let statHigh = getStatHigh(gameData, statIndex);
        let statPercent = (classStat / statHigh) * 100;
        return statPercent;
    }
    else {
        console.log('Error- Game Data is not loaded.')
    }
}

// Calculate all the stat percentages for a specified character class
let getClassStatPercents = function(gameData, classIndex) {
    if(gameData) {
        // Make array of the stat percentages of the current class
        let classStatPercents = Array.of(getStatPercent(gameData, classIndex, 0), getStatPercent(gameData, classIndex, 1), getStatPercent(gameData, classIndex, 2), getStatPercent(gameData, classIndex, 3), getStatPercent(gameData, classIndex, 4));
        return classStatPercents;
    }
    else {
        console.log('Error- Game Data is not loaded.')
    }
}

//  Calculate the combined base stat and stat mod percent for a single stat (for a specified class and race)
let getCombinedPercent = function(gameData, classIndex, raceIndex, statIndex) {
    if(gameData) {
        let classStat = gameData.baseStats[classIndex][statIndex];
        let raceMod = gameData.statMods[raceIndex][statIndex]
        let statHigh = getStatHigh(gameData, statIndex);
        let combinedPercent = ((classStat + raceMod) / statHigh) * 100;
        // console.log('class stat: ' + classStat + ' / stat high: ' + statHigh + ' * 100 === stat percent: ' + statPercent)
        return combinedPercent;
    }
    else {
        console.log('Error- Game Data is not loaded.')
    }
}

// Create an array of the percents for class base stat + race stat mod.
let getCombinedPercents = function(gameData, classIndex, raceIndex) {
    if(gameData) {
        // Make array of the stat percentages of the current class
        let combinedPercents = Array.of(getCombinedPercent(gameData, classIndex, raceIndex, 0), getCombinedPercent(gameData, classIndex, raceIndex, 1), getCombinedPercent(gameData, classIndex, raceIndex, 2), getCombinedPercent(gameData, classIndex, raceIndex, 3), getCombinedPercent(gameData, classIndex, raceIndex, 4));
        // console.log(combinedPercents)
        return combinedPercents;
    }
    else {
        console.log('Error- Game Data is not loaded.')
    }
}

// 
// Set Chart data based on choices
// 

// Check for current selection based on which radio button has been checked (for specified group).
let choiceCheck = function(groupName) {
    let radios = document.getElementsByName(groupName);
    for( let i = 0; i < radios.length; i++ ) {
        if( radios[i].checked ) {
            return radios[i].value;
        }
    }
}

// Check for currently selected class
let checkClass = function() {
    return choiceCheck('classGroup');
}

// Check for currently selected race
let checkRace = function() {
    return choiceCheck('raceGroup');
}

// Check for currently selected element
let checkElement = function() {
    return choiceCheck('elementGroup');
}

// Runs when a radio button is clicked.
let onRadioChoice = function() {
    setChartData(gameData, checkClass(), checkRace())
    // checkElement();
}

// Class Radio Buttons
const archBtn = document.getElementById('archer');
const clerBtn = document.getElementById('cleric');
const magBtn = document.getElementById('magician');
const warBtn = document.getElementById('warrior');

// Race Radio Buttons
const avenBtn = document.getElementById('aven');
const brekenBtn = document.getElementById('breken');
const kyrekBtn = document.getElementById('kyrek');
const rokollBtn = document.getElementById('rokoll');
const silmaeriBtn = document.getElementById('silmaeri');

// Element Radio Buttons
const airBtn = document.getElementById('air');
const earthBtn = document.getElementById('earth');
const fireBtn = document.getElementById('fire');
const waterBtn = document.getElementById('water');

let radioButtons = [archBtn, clerBtn, magBtn, warBtn, avenBtn, brekenBtn, kyrekBtn, rokollBtn, silmaeriBtn, airBtn, earthBtn, fireBtn, waterBtn];

// Add click event to radio buttons
for (let i = 0; i < radioButtons.length; i++) {
    radioButtons[i].addEventListener("click", onRadioChoice);
}

// 
// Set chart data for class + race
// 

let setChartData = function(gameData, classChoice, raceChoice) {
    if (gameData) {
        if(classChoice) {
            let classIndex = getClassIndex(classChoice);
            let classPercents = getClassStatPercents(gameData, classIndex);
            
            if(raceChoice) {
                let raceIndex = getRaceIndex(raceChoice);
                let combinedStats = getCombinedPercents(gameData, classIndex, raceIndex);
                updateStats(classPercents, combinedStats);
                updateStatsDisplay(gameData, classIndex, raceIndex);
            }
            else {
                updateStats(classPercents);
                updateStatsDisplay(gameData, classIndex, null);
            }
        }
        else if(raceChoice) {
            let raceIndex = getRaceIndex(raceChoice);
            let statMods = gameData.statMods[raceIndex];
            const combinedTotal = statMods.map(num => num + 10);
            updateStats(null, null, combinedTotal);
            updateStatsDisplay(gameData, null, raceIndex);
        }
        
        
    }
    else {
        console.log('failed to access gameData')
    }
}

// Update Graph Stats
let updateStats = function (classStats, combinedStats, raceStats) {
    radarData.datasets[0].data = classStats;
    if(combinedStats) {
        radarData.datasets[1].data = combinedStats;
    }
    else if(raceStats) {
        radarData.datasets[0].data = [10, 10, 10, 10, 10];
        radarData.datasets[1].data = raceStats;
    }
    // console.log(radarData.datasets[0].data);
    myChart.update();
}

let updateStatsDisplay = function(gameData, classIndex, raceIndex) {
    if(gameData) {
        let classStats = [];
        let raceStats = [];
        
        if(typeof classIndex === "number") {
            classStats = getClassStats(gameData, classIndex);
        }
        else {
            classStats = [0,0,0,0,0]
        }

        if(typeof raceIndex === "number") {
            raceStats = getRaceStats(gameData, raceIndex);
        }
        else {
            raceStats = [0,0,0,0,0]
        }
        let statsDisplay = document.getElementById('statsDisplay');
        statsDisplay.innerHTML = `<strong>Max HP</strong>: 
        <span class="text-danger">${classStats[0]}</span> + 
        <span class="text-primary">${raceStats[0]}</span>, <strong>Max TP</strong>: 
        <span class="text-danger">${classStats[1]}</span> + 
        <span class="text-primary">${raceStats[1]}</span>, <strong>STR</strong>: 
        <span class="text-danger">${classStats[2]}</span> + 
        <span class="text-primary">${raceStats[2]}</span>, <strong>INT</strong>: 
        <span class="text-danger">${classStats[3]}</span> + 
        <span class="text-primary">${raceStats[3]}</span>, <strong>AGI</strong>: 
        <span class="text-danger">${classStats[4]}</span> + 
        <span class="text-primary">${raceStats[4]}</span>`
        console.log('finish update stats display')
    }
    else {
        console.log('failed to access gameData');
    }
}

// // 
// // Form Submission
// // 

const formSetup = function() {
    // Set items to be submitted by the form
    let items = [
        ["characterName", "heroName"],
        ["characterClass", "classGroup"],
        ["characterRace", "raceGroup"],
        ["characterElement", "elementGroup"],
    ]

    // Set up form submission
    formSubmit("character.html", "charPage.html", items);
}

formSetup();