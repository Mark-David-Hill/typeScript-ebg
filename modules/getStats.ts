// 
// Get Unaltered Stats
// 

import GameData from "./util/GameData";

const getClassStats = (gameData: GameData, classIndex: number): number[] => {
    // console.log('start get class stats')
    // console.log(classIndex)
    let classStats = gameData.baseStats[classIndex];
    // console.log('finish get class stats')
    return classStats;
}
const getRaceStats = (gameData: GameData, raceIndex: number): number[] => {
    let raceStats = gameData.statMods[raceIndex];
    // console.log('finish get race stats')
    return raceStats;
}

const getCombinedStats = (gameData: GameData, classIndex: number, raceIndex: number): number[] => {
    let classStats = getClassStats(gameData, classIndex);
    let raceStats = getRaceStats(gameData, raceIndex);
    let combinedStats = classStats.map(function (num, idx) {
        return num + raceStats[idx];
    });
    // console.log('finished get combined stats');
    return combinedStats;
}

export { getClassStats, getRaceStats, getCombinedStats }