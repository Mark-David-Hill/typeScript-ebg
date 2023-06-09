// Interface for a single technique's data

interface Technique {
  name: string;
  wisdom: number;
  tp: number;
  range: number | string;
  cooldown: number;
  description: string;
  damageStat: string;
  damageMultiplier: number | string;
  image: string;
}

export default Technique;