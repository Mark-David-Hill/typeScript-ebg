// 
// Display Weapons
// 

import GameData from "./util/GameData";

const displayWeapons = (gameData: GameData, classIndex: number, getEl: Function, display: Function) => {
    const rWeaponEl = getEl('archWeapons');
    const mWeaponEl = getEl('meleeWeapon');
    // Only display ranged weapon if Archer was chosen
    if (classIndex === 0) {
        rWeaponEl.classList.remove('hidden');
        mWeaponEl.classList.add('hidden');
    }
    // Display Name of Melee Weapon
    else {
        const mNameEl = getEl('mWeaponName')
        const mWeaponName = gameData.startWeapons[classIndex];
        display(mNameEl, mWeaponName)
    }
}

export default displayWeapons