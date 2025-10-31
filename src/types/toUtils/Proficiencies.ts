import { Schema, Document } from "mongoose";

interface ProficienciesInterface extends Document {
  armors: string[];
  weapons: string[];
  tools: string[];
  languages: string[];
}

const ProficienciesSchema = new Schema<ProficienciesInterface>(
  {
    armors: { type: [String], required: true, default: [] },
    weapons: { type: [String], required: true, default: [] },
    tools: { type: [String], required: true, default: [] },
    languages: { type: [String], required: true, default: [] },
  },
  {
    _id: false,
  }
);

export const Proficiencies = {
  ProficienciesSchema,
};

export type Proficiencies = {
  ProficienciesInterface: ProficienciesInterface;
};
