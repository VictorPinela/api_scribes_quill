import { Schema, model, Document, Types } from "mongoose";
import { enumAlignment, enumStatus, ICharacter } from "../types";

const hp = {
  current: { type: Number, required: true, default: 10 },
  max: { type: Number, required: true, default: 10 },
  temporary: { type: Number, required: true, default: 0 },
};

const speeds = {
  movement: { type: Number, required: true },
  burrow: { type: Number, required: false },
  climb: { type: Number, required: false },
  flyw: { type: Number, required: false },
  swim: { type: Number, required: false },
};

const statsModel = {
  value: { type: Number, required: true, min: 1, max: 30, defaut: 10 },
  modifier: { type: Number, required: true },
  savingThrows: { type: Boolean, required: true, default: false },
};

const stats = {
  strength: { type: statsModel, required: true, _id: false },
  dexterity: { type: statsModel, required: true, _id: false },
  constitution: { type: statsModel, required: true, _id: false },
  intelligence: { type: statsModel, required: true, _id: false },
  wisdom: { type: statsModel, required: true, _id: false },
  charisma: { type: statsModel, required: true, _id: false },
};

const skillModel = {
  stats: { type: String, required: true, enum: enumStatus },
  proficient: { type: Boolean, required: true, default: false },
  expertise: { type: Boolean, required: true, default: false },
  modifier: { type: Number, required: true },
};

const skills = {
  acrobatics: { type: skillModel, required: true, _id: false },
  animalHandling: { type: skillModel, required: true, _id: false },
  arcana: { type: skillModel, required: true, _id: false },
  athletics: { type: skillModel, required: true, _id: false },
  deception: { type: skillModel, required: true, _id: false },
  history: { type: skillModel, required: true, _id: false },
  insight: { type: skillModel, required: true, _id: false },
  intimidation: { type: skillModel, required: true, _id: false },
  investigation: { type: skillModel, required: true, _id: false },
  medicine: { type: skillModel, required: true, _id: false },
  nature: { type: skillModel, required: true, _id: false },
  perception: { type: skillModel, required: true, _id: false },
  performance: { type: skillModel, required: true, _id: false },
  persuasion: { type: skillModel, required: true, _id: false },
  religion: { type: skillModel, required: true, _id: false },
  sleightOfHand: { type: skillModel, required: true, _id: false },
  stealth: { type: skillModel, required: true, _id: false },
  survival: { type: skillModel, required: true, _id: false },
};

const proficiencies = {
  armor: { type: [String], required: true },
  weapons: { type: [String], required: true },
  tools: { type: [String], required: true },
  languages: { type: [String], required: true },
};

const personalCharacteristics = {
  traits: { type: String, required: false },
  ideals: { type: String, required: false },
  bonds: { type: String, required: false },
  flaws: { type: String, required: false },
};

const equippedInHand = {
  name: { type: String, required: true },
  type: { type: String, required: true },
};

const slots = {
  level: { type: Number, required: true, min: 1, max: 9 },
  total: { type: Number, required: true, min: 0 },
  used: { type: Number, required: true, min: 0, default: 0 },
};

const spells = {
  spellcastingStatus: {
    type: String,
    enum: enumStatus,
    required: false,
  },
  spellSaveDC: { type: Number, required: true, default: 8 },
  spellAttackBonus: { type: Number, required: true, default: 2 },
  slots: { type: [slots], required: false, _id: false },
};

const armor = {
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    toLowerCase: true,
  },
  quantity: { type: Number, required: true },
  type: { type: String, required: true },
  armorClass: { type: String, required: true },
  minStrength: { type: Number, required: false },
  stealthDisadvantage: { type: Boolean, required: true },
  weight: { type: Number, required: true },
  equipped: { type: Boolean, required: true },
  requiresAttunement: { type: Boolean, required: true },
};

const shield = {
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    toLowerCase: true,
  },
  quantity: { type: Number, required: true },
  armorClass: { type: String, required: true },
  weight: { type: Number, required: true },
  equipped: { type: Boolean, required: true },
  requiresAttunement: { type: Boolean, required: true },
};

const weapon = {
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    toLowerCase: true,
  },
  quantity: { type: Number, required: true },
  type: { type: String, required: true },
  damageDice: { type: String, required: true },
  damageTipe: { type: String, required: true },
  properties: { type: String, required: true },
  mastery: { type: String, required: true },
  weight: { type: Number, required: true },
  equipped: { type: Boolean, required: true },
  dualHanded: { type: Boolean, required: true },
  munition: { type: Number, required: false },
  requiresAttunement: { type: Boolean, required: true },
};

const magicItem = {
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    toLowerCase: true,
  },
  quantity: { type: Number, required: true },
  weight: { type: Number, required: true },
  equipped: { type: Boolean, required: true },
  requiresAttunement: { type: Boolean, required: true },
  description: { type: String, required: true },
};

const item = {
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    toLowerCase: true,
  },
  quantity: { type: Number, required: true },
  weight: { type: Number, required: true },
  description: { type: String, required: true },
};

const currency = {
  copper: { type: Number, required: true, default: 0 },
  silver: { type: Number, required: true, default: 0 },
  electrum: { type: Number, required: true, default: 0 },
  gold: { type: Number, required: true, default: 0 },
  platinum: { type: Number, required: true, default: 0 },
};

const equipment = {
  armors: { type: [armor], required: false, _id: false },
  shields: { type: [shield], required: false, _id: false },
  weapons: { type: [weapon], required: false, _id: false },
  magicItems: { type: [magicItem], required: false, _id: false },
  rightHand: { type: equippedInHand, required: true },
  lefttHand: { type: equippedInHand, required: true },
  attuned: { type: [String], required: true },
};

const inventory = {
  equipment: { type: equipment, required: true },
  items: { type: [item], required: false, _id: false },
  currency: { type: currency, required: true },
};

const appearance = {
  age: { type: Number, required: false },
  height: { type: String, required: false },
  weight: { type: String, required: false },
  eyes: { type: String, required: false },
  skin: { type: String, required: false },
  hair: { type: String, required: false },
  description: { type: String, required: false },
  gender: { type: String, required: false },
};

const CharacterSchema = new Schema<ICharacter>(
  {
    name: { type: String, required: true, trim: true, toLowerCase: true },
    level: { type: Number, required: true, default: 1 },
    class: { type: Schema.Types.ObjectId, ref: "Class", required: true },
    subClass: { type: String, required: false },
    specie: { type: Schema.Types.ObjectId, ref: "Specie", required: true },
    background: {
      type: Schema.Types.ObjectId,
      ref: "Background",
      required: true,
    },
    alignment: { type: String, required: false, enum: enumAlignment },
    experience: { type: Number, required: true, default: 0 },
    hp: { type: hp, required: true },
    armorClass: { type: Number, required: true, default: 10 },
    initiative: { type: Number, default: 0 },
    speeds: { type: speeds, required: true, _id: false },
    stats: { type: stats, required: true },
    skills: { type: skills, required: true },
    proficiencies: { type: proficiencies, required: true },
    personalCharacteristics: { type: personalCharacteristics, required: true },
    feats: { type: [String], required: true },
    inventory: { type: inventory, required: true },
    spells: { type: spells, required: false, _id: false },
    spellsKnow: [
      {
        type: Schema.Types.ObjectId,
        ref: "Spell",
        required: true,
      },
    ],
    appearance: { type: appearance, required: false },
    backstory: { type: String, required: false },
    userId: { type: Schema.Types.ObjectId, ref: "Character", required: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
    toJSON: {
      virtuals: ["class", "specie", "background", "spells.spells", "userId"],
    },
  }
);

export const Character = model<ICharacter>("Character", CharacterSchema);
