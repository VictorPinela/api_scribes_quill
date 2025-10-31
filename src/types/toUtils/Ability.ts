import { Schema, Document } from "mongoose";

type Abilities =
  | "força"
  | "destreza"
  | "constituição"
  | "inteligencia"
  | "sabedoria"
  | "carisma";

const enumAbilities: Abilities[] = [
  "força",
  "destreza",
  "constituição",
  "inteligencia",
  "sabedoria",
  "carisma",
];

interface AbilitiesScoreInterface extends Document {
  value: number;
  modifier: number;
  savingThrows: boolean;
}

const AbilitiesScoreSchema = new Schema<AbilitiesScoreInterface>(
  {
    value: { type: Number, required: true, default: 10 },
    modifier: { type: Number, required: true, default: 0 },
    savingThrows: { type: Boolean, required: true, default: false },
  },
  {
    _id: false,
  }
);

interface AbilitiesInterface extends Document {
  strength: AbilitiesScoreInterface;
  dexterity: AbilitiesScoreInterface;
  constitution: AbilitiesScoreInterface;
  intelligence: AbilitiesScoreInterface;
  wisdom: AbilitiesScoreInterface;
  charisma: AbilitiesScoreInterface;
}

const AbilitiesSchema = new Schema<AbilitiesInterface>(
  {
    strength: { type: AbilitiesScoreSchema, required: true },
    dexterity: { type: AbilitiesScoreSchema, required: true },
    constitution: { type: AbilitiesScoreSchema, required: true },
    intelligence: { type: AbilitiesScoreSchema, required: true },
    wisdom: { type: AbilitiesScoreSchema, required: true },
    charisma: { type: AbilitiesScoreSchema, required: true },
  },
  {
    _id: false,
  }
);

export const Ability = {
  enumAbilities,
  AbilitiesScoreSchema,
  AbilitiesSchema,
};

export type Ability = {
  Abilities: Abilities;
  AbilitiesScoreInterface: AbilitiesScoreInterface;
  AbilitiesInterface: AbilitiesInterface;
};
