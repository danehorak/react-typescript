export interface Character {
  id: number;
  name: string;
  title: string;
  tags: string[];
  base: {
    strength: number;
    dexterity: number;
    mind: number;
    presence: number;
  };
  combat: {
    vitality: number;
    evasion: number;
    arnor: number;
    alacrity: number;
    tenacity: number;
    power: number;
  };
  skills: {
    fighting: number;
    thievery: number;
    stealth: number;
    archery: number;
    learned: number;
    survival: number;
    perception: number;
    apothecary: number;
    intimidation: number;
    performance: number;
    manipulation: number;
    insight: number;
    power: number;
  };
  armor: {
    chest: number;
  };
  weapon: {
    sword: number;
    bow: number;
  };
  icon: string;
  image: string;
  sprite: {
    url: string;
    x: number;
    y: number;
  };
  damage: number;
  description: string;
}
