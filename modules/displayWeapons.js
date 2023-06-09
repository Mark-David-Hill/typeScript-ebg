// 
// Display Weapons
// 

const displayWeapons = (gameData, classIndex, getEl, display) => {
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