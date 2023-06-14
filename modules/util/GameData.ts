// Interface for the Game's Data

import Technique from './Technique';
import SoulForce from './SoulForce';
import LevelUpData from './LevelUpData';

interface GameData {
  stats: string[];
  elements: string[];
  races: string[];
  statMods: number[][];
  charClasses: string[];
  baseStats: number[][];
  startWeapons: string[];
  techniques: Technique[][];
  raceSoulForces: SoulForce[];
  classSoulForces: SoulForce[];
  weapons: [][];
  armorTypes: string[];
  armor: [][];
  startChargeCount: number;
  levelCap: number;
  levels: LevelUpData[];
  // Below here could be more fleshed-out
  playerChar: object;
  enemies: object[];
  chapter1: object;
  chapter2: object;
}

export default GameData;