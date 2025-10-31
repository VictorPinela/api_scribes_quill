import { Document, Schema, model } from "mongoose";
import { Features } from "../types";

export interface ShieldInterface extends Document {
  name: string;
  armorClass: number;
  weight: number;
  requiresAttunement: boolean;
  description?: string;
  cost: number;
  features: Features["FeaturesInterface"][];
}

const ShieldSchema = new Schema<ShieldInterface>(
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
    armorClass: { type: Number, required: false, default: 2 },
    weight: { type: Number, required: true, default: 0 },
    requiresAttunement: { type: Boolean, required: true, default: false },
    description: { type: String, required: false },
    cost: { type: Number, required: true, default: 0 },
    features: { type: [Features.FeaturesSchema], required: true },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

export const Shield = model<ShieldInterface>("Shield", ShieldSchema);
