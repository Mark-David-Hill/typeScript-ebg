// 
// Get Soul Forces
// 

import GameData from "./util/GameData";

// Get Class Soul Force

const getCsf = (gameData: GameData, classIndex: number) => {
    let name = gameData.classSoulForces[classIndex].name;
    let desc = gameData.classSoulForces[classIndex].description;
    let csf = [name, desc];
    return csf;
}

// Get Race Soul Force

const getRsf = (gameData: GameData, raceIndex: number) => {
    let name = gameData.raceSoulForces[raceIndex].name;
    let desc = gameData.raceSoulForces[raceIndex].description;
    let rsf = [name, desc];
    return rsf;
}

export { getCsf, getRsf }