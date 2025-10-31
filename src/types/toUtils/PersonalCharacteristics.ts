import { Schema, Document } from "mongoose";

interface PersonalCharacteristicsInterface extends Document {
  traits?: string;
  ideals?: string;
  bonds?: string;
  flaws?: string;
}

const PersonalCharacteristicsSchema =
  new Schema<PersonalCharacteristicsInterface>(
    {
      traits: { type: String, required: false },
      ideals: { type: String, required: false },
      bonds: { type: String, required: false },
      flaws: { type: String, required: false },
    },
    {
      _id: false,
    }
  );

export const PersonalCharacteristics = {
  PersonalCharacteristicsSchema,
};

export type PersonalCharacteristics = {
  PersonalCharacteristicsInterface: PersonalCharacteristicsInterface;
};
