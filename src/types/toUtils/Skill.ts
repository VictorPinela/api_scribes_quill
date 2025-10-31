import { Schema, Document } from "mongoose";
import { Ability } from "..";

type Skills =
  | "acrobacia"
  | "adestrar animais"
  | "arcanismo"
  | "atletismo"
  | "atuação"
  | "enganação"
  | "furtividade"
  | "história"
  | "intimidação"
  | "intuição"
  | "investigação"
  | "medicina"
  | "natureza"
  | "percepção"
  | "persuasão"
  | "prestedigitação"
  | "religião"
  | "sobrevivencia";

const enumSkill: Skills[] = [
  "acrobacia",
  "adestrar animais",
  "arcanismo",
  "atletismo",
  "atuação",
  "enganação",
  "furtividade",
  "história",
  "intimidação",
  "intuição",
  "investigação",
  "medicina",
  "natureza",
  "percepção",
  "persuasão",
  "prestedigitação",
  "religião",
  "sobrevivencia",
];

const skillAbilityMap: Record<Skills, Ability["Abilities"]> = {
  acrobacia: "destreza",
  "adestrar animais": "sabedoria",
  arcanismo: "inteligencia",
  atletismo: "força",
  atuação: "carisma",
  enganação: "carisma",
  furtividade: "destreza",
  história: "inteligencia",
  intimidação: "carisma",
  intuição: "sabedoria",
  investigação: "inteligencia",
  medicina: "sabedoria",
  natureza: "inteligencia",
  percepção: "sabedoria",
  persuasão: "carisma",
  prestedigitação: "destreza",
  religião: "inteligencia",
  sobrevivencia: "sabedoria",
};

interface SkillsScoreInterface extends Document {
  stats: Ability["Abilities"];
  proficient: boolean;
  expertise: boolean;
  modifier: number;
}

const SkillsScoreSchema = new Schema<SkillsScoreInterface>(
  {
    stats: { type: String, enum: Ability.enumAbilities, required: true },
    proficient: { type: Boolean, required: true, default: false },
    expertise: { type: Boolean, required: true, default: false },
    modifier: { type: Number, required: true, default: 0 },
  },
  {
    _id: false,
  }
);

interface SkillsInterface extends Document {
  acrobatics: SkillsScoreInterface;
  animalHandling: SkillsScoreInterface;
  arcana: SkillsScoreInterface;
  athletics: SkillsScoreInterface;
  deception: SkillsScoreInterface;
  history: SkillsScoreInterface;
  insight: SkillsScoreInterface;
  intimidation: SkillsScoreInterface;
  investigation: SkillsScoreInterface;
  medicine: SkillsScoreInterface;
  nature: SkillsScoreInterface;
  perception: SkillsScoreInterface;
  performance: SkillsScoreInterface;
  persuasion: SkillsScoreInterface;
  religion: SkillsScoreInterface;
  sleightOfHand: SkillsScoreInterface;
  stealth: SkillsScoreInterface;
  survival: SkillsScoreInterface;
}

const SkillsSchema = new Schema<SkillsInterface>(
  {
    acrobatics: { type: SkillsScoreSchema, required: true },
    animalHandling: { type: SkillsScoreSchema, required: true },
    arcana: { type: SkillsScoreSchema, required: true },
    athletics: { type: SkillsScoreSchema, required: true },
    deception: { type: SkillsScoreSchema, required: true },
    history: { type: SkillsScoreSchema, required: true },
    insight: { type: SkillsScoreSchema, required: true },
    intimidation: { type: SkillsScoreSchema, required: true },
    investigation: { type: SkillsScoreSchema, required: true },
    medicine: { type: SkillsScoreSchema, required: true },
    nature: { type: SkillsScoreSchema, required: true },
    perception: { type: SkillsScoreSchema, required: true },
    performance: { type: SkillsScoreSchema, required: true },
    persuasion: { type: SkillsScoreSchema, required: true },
    religion: { type: SkillsScoreSchema, required: true },
    sleightOfHand: { type: SkillsScoreSchema, required: true },
    stealth: { type: SkillsScoreSchema, required: true },
    survival: { type: SkillsScoreSchema, required: true },
  },
  {
    _id: false,
  }
);

interface ClassesSkillsInterface extends Document {
  choose: number;
  skills: Skills[];
}

const ClassesSkillsSchema = new Schema<ClassesSkillsInterface>(
  {
    choose: { type: Number, required: true },
    skills: { type: [String], enum: enumSkill, required: true },
  },
  {
    _id: false,
  }
);

export const Skill = {
  enumSkill,
  skillAbilityMap,
  SkillsScoreSchema,
  SkillsSchema,
  ClassesSkillsSchema,
};

export type Skill = {
  Skills: Skills;
  SkillsScoreInterface: SkillsScoreInterface;
  SkillsInterface: SkillsInterface;
  ClassesSkillsInterface: ClassesSkillsInterface;
};
