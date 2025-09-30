import { Schema, model, Document, Types } from "mongoose";

export interface IBackground extends Document {
  name: string;
  abilityScore: Status[];
  feat: string;
  skillProficiencies: Skill[];
  toolProficiencies: string[];
  equipment: string;
}

export interface IBlacklistedToken extends Document {
  token: string;
  expiresAt: Date;
  userId: Types.ObjectId;
}

export interface IFeaturesPerLevel {
  level: number;
  features: string[];
}

export interface ISubClass {
  name: string;
  featuresPerLevel: IFeaturesPerLevel[];
}

export interface IClass extends Document {
  name: string;
  primaryStatus: Status;
  hpDice: Dice;
  savingThrowProficiencies: Status[];
  skillProficiencies: {
    choose: number;
    skills: Skill[];
  };
  weaponProficiencies: string[];
  toolProficiencies: string[];
  armorProficiencies: string[];
  startingGear: string;
  description?: string;
  featuresPerLevel: IFeaturesPerLevel[];
  subClass: ISubClass[];
}

export interface ISpeeds {
  movement: number;
  burrow?: number;
  climb?: number;
  flyw?: number;
  swim?: number;
}

export interface ISpecie extends Document {
  name: string;
  creatureType: string;
  size: string;
  speed: ISpeeds;
  languages: string[];
  traits?: string[];
  info?: string;
}

export interface IComponent {
  verbal: boolean;
  somatic: boolean;
  material?: string;
}

export interface ISpell extends Document {
  name: string;
  level: number;
  school: string;
  class: Types.ObjectId[];
  prepared: boolean;
  castingTime: string;
  range: string;
  component: IComponent;
  duration: string;
  description: string;
  savingThrow: boolean;
  attack: boolean;
  higherLevels?: string[];
  ritual: boolean;
  concentration: boolean;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  verificationToken?: string | undefined;
  verificationTokenExpires?: Date | undefined;
  resetPasswordToken?: string | undefined;
  resetPasswordExpires?: Date | undefined;
  characters: Types.ObjectId[];
  createdAt?: Date;
  //   preferences: {
  //     theme: String;
  //     notifications: {
  //       email: Boolean;
  //       newFeatures: Boolean;
  //     };
  //   };
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IStats {
  value: number;
  modifier: number;
  savingThrows: boolean;
}

export interface ISkills {
  stats: Status;
  proficient: boolean;
  expertise: boolean;
  modifier: number;
}

export interface IHp {
  current: number;
  max: number;
  temporary: number;
}

export interface ICurrency {
  copper: number;
  silver: number;
  electrum: number;
  gold: number;
  platinum: number;
}

export interface IEquippedInHand {
  name: string;
  type: string;
}

export interface ISlots {
  level: number;
  total: number;
  used: number;
}

export interface IAppearance {
  age?: number;
  height?: string;
  weight?: string;
  eyes?: string;
  skin?: string;
  hair?: string;
  description?: string;
  gender?: string;
}

export interface ICharacter extends Document {
  name: string;
  level: number;
  class: Types.ObjectId;
  subClass: string;
  specie: Types.ObjectId;
  background: Types.ObjectId;
  alignment?: Alignment;
  experience: number;
  hp: IHp;
  armorClass: number;
  initiative: number;
  speeds: ISpeeds;
  stats: {
    strength: IStats;
    dexterity: IStats;
    constitution: IStats;
    intelligence: IStats;
    wisdom: IStats;
    charisma: IStats;
  };
  skills: {
    acrobatics: ISkills;
    animalHandling: ISkills;
    arcana: ISkills;
    athletics: ISkills;
    deception: ISkills;
    history: ISkills;
    insight: ISkills;
    intimidation: ISkills;
    investigation: ISkills;
    medicine: ISkills;
    nature: ISkills;
    perception: ISkills;
    performance: ISkills;
    persuasion: ISkills;
    religion: ISkills;
    sleightOfHand: ISkills;
    stealth: ISkills;
    survival: ISkills;
  };
  proficiencies: {
    armor: string[];
    weapons: string[];
    tools: string[];
    languages: string[];
  };
  personalCharacteristics?: {
    traits: string;
    ideals: string;
    bonds: string;
    flaws: string;
  };
  feats: string[];
  inventory: {
    equipment: {
      armor?: IArmor[];
      shield?: IShield[];
      weapon?: IWeapon[];
      magicItems?: IMagicItems[];
      rightHand: IEquippedInHand;
      lefttHand: IEquippedInHand;
      attuned: string[];
    };
    items?: IItems[];
    currency: ICurrency;
  };
  spells?: {
    spellcastingStatus: Status;
    spellSaveDC: number;
    spellAttackBonus: number;
    slots: ISlots[];
  };
  spellsKnow: Types.ObjectId[];
  appearance?: IAppearance;
  backstory?: string;
  userId: Types.ObjectId;
  createdAt?: string;
}

export interface IArmor extends Document {
  name: string;
  quantity: number;
  type: string;
  armorClass: string;
  minStrength?: number;
  stealthDisadvantage: boolean;
  weight: number;
  equipped: boolean;
  requiresAttunement: boolean;
}

export interface IShield extends Document {
  name: string;
  quantity: number;
  armorClass: string;
  weight: number;
  equipped: boolean;
  requiresAttunement: boolean;
}

export interface IWeapon extends Document {
  name: string;
  quantity: number;
  type: string;
  damage: string;
  damageTipe: string;
  properties: string;
  mastery: string;
  weight: number;
  equipped: boolean;
  dualHanded: boolean;
  munition: number;
  requiresAttunement: boolean;
}

export interface IMagicItems extends Document {
  name: string;
  quantity: number;
  weight: number;
  equipped: boolean;
  requiresAttunement: boolean;
  description: string;
}

export interface IItems extends Document {
  name: string;
  quantity: number;
  weight: number;
  description?: string;
}

export type Status =
  | "strength"
  | "dexterity"
  | "constitution"
  | "intelligence"
  | "wisdom"
  | "charisma";

export const enumStatus = [
  "strength",
  "dexterity",
  "constitution",
  "intelligence",
  "wisdom",
  "charisma",
];

export type Skill =
  | "acrobatics"
  | "animalHandling"
  | "arcana"
  | "athletics"
  | "deception"
  | "history"
  | "insight"
  | "intimidation"
  | "investigation"
  | "medicine"
  | "nature"
  | "perception"
  | "performance"
  | "persuasion"
  | "religion"
  | "sleightOfHand"
  | "stealth"
  | "survival";

export const enumSkill = [
  "acrobatics",
  "animalHandling",
  "arcana",
  "athletics",
  "deception",
  "history",
  "insight",
  "intimidation",
  "investigation",
  "medicine",
  "nature",
  "perception",
  "performance",
  "persuasion",
  "religion",
  "sleightOfHand",
  "stealth",
  "survival",
];

export type Dice = `d4` | "d6" | "d8" | "d10" | "d12" | "d20" | "d100";

export const enumDice = [`d4`, "d6", "d8", "d10", "d12", "d20", "d100"];

export type Alignment =
  | "LG"
  | "LN"
  | "LE"
  | "NG"
  | "NN"
  | "NE"
  | "CG"
  | "CN"
  | "CE";

export const enumAlignment = [
  "LG",
  "LN",
  "LE",
  "NG",
  "NN",
  "NE",
  "CG",
  "CN",
  "CE",
];
