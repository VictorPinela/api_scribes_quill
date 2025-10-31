import { Schema, Document } from "mongoose";
import { Ability } from "./Ability";

type SpellSchool =
  | "Abjuração"
  | "Conjuração"
  | "Adivinhação"
  | "Encantamento"
  | "Evocação"
  | "Ilusão"
  | "Necromancia"
  | "Transmutação";

const enumSpellSchool: SpellSchool[] = [
  "Abjuração",
  "Conjuração",
  "Adivinhação",
  "Encantamento",
  "Evocação",
  "Ilusão",
  "Necromancia",
  "Transmutação",
];

interface ComponentInterface extends Document {
  verbal: boolean;
  somatic: boolean;
  material?: string;
}

const ComponentSchema = new Schema<ComponentInterface>(
  {
    verbal: { type: Boolean, required: true, default: false },
    somatic: { type: Boolean, required: true, default: false },
    material: { type: String, required: false },
  },
  {
    _id: false,
  }
);

interface SlotsInterface extends Document {
  level: number;
  total: number;
  used: number;
}

const SlotsSchema = new Schema<SlotsInterface>(
  {
    level: { type: Number, required: true },
    total: { type: Number, required: true },
    used: { type: Number, required: true },
  },
  {
    _id: false,
  }
);

interface MagicInterface extends Document {
  spellcastingAbility: Ability["Abilities"];
  spellSaveDC: number;
  spellAttackBonus: number;
  slots: SlotsInterface[];
}

const MagicSchema = new Schema<MagicInterface>(
  {
    spellcastingAbility: {
      type: String,
      enum: Ability.enumAbilities,
      required: true,
    },
    spellSaveDC: { type: Number, required: true, default: 10 },
    spellAttackBonus: { type: Number, required: true, default: 2 },
    slots: { type: [SlotsSchema], required: true },
  },
  {
    _id: false,
  }
);

export const Magic = {
  ComponentSchema,
  SlotsSchema,
  MagicSchema,
  enumSpellSchool,
};

export type Magic = {
  ComponentInterface: ComponentInterface;
  SlotsInterface: SlotsInterface;
  MagicInterface: MagicInterface;
  SpellSchool: SpellSchool;
};
