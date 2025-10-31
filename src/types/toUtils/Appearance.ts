import { Schema, Document } from "mongoose";

interface AppearanceInterface extends Document {
  age?: number;
  height?: string;
  weight?: string;
  eyes?: string;
  skin?: string;
  hair?: string;
  description?: string;
  gender?: string;
}

const AppearanceSchema = new Schema<AppearanceInterface>(
  {
    age: { type: Number, required: false },
    height: { type: String, required: false },
    weight: { type: String, required: false },
    eyes: { type: String, required: false },
    skin: { type: String, required: false },
    hair: { type: String, required: false },
    description: { type: String, required: false },
    gender: { type: String, required: false },
  },
  {
    _id: false,
  }
);
export const Appearance = {
  AppearanceSchema,
};

export type Appearance = {
  AppearanceInterface: AppearanceInterface;
};
