import { Document, Schema, model } from "mongoose";
import { Ability } from "../types";

export interface ToolInterface extends Document {
  name: string;
  ability?: Ability["Abilities"];
  utilize?: string;
  craft?: string;
  weight: number;
  description?: string;
  cost: number;
}

const ToolSchema = new Schema<ToolInterface>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
      lowercase: true,
      _id: true,
    },
    ability: { type: String, required: false, enum: Ability.enumAbilities },
    utilize: { type: String, required: false },
    craft: { type: String, required: false },
    weight: { type: Number, required: true, default: 0 },
    description: { type: String, required: false },
    cost: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

export const Tool = model<ToolInterface>("Tool", ToolSchema);
