// 
// Get Soul Forces
// 
// Get Class Soul Force
const getCsf = (gameData, classIndex) => {
    let name = gameData.classSoulForces[classIndex].name;
    let desc = gameData.classSoulForces[classIndex].description;
    let csf = [name, desc];
    return csf;
};
// Get Race Soul Force
const getRsf = (gameData, raceIndex) => {
    let name = gameData.raceSoulForces[raceIndex].name;
    let desc = gameData.raceSoulForces[raceIndex].description;
    let rsf = [name, desc];
    return rsf;
};
export { getCsf, getRsf };
