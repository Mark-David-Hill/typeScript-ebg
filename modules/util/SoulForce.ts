// Interface for a Soul Force's data

interface SoulForce {
  name: string;
  chargeCost: number;
  range: number | string;
  damageStat: string;
  damageMultiplier: number | string;
  description: string;
}

export default SoulForce;