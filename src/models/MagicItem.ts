import { Document, Schema, model } from "mongoose";
import { Features } from "../types";

export interface MagicItemInterface extends Document {
  name: string;
  weight: number;
  consumable: boolean;
  requiresAttunement: boolean;
  description?: string;
  cost: number;
  features: Features["FeaturesInterface"][];
}

const MagicItemSchema = new Schema<MagicItemInterface>(
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
    consumable: { type: Boolean, required: true, default: false },
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

export const MagicItem = model<MagicItemInterface>(
  "MagicItem",
  MagicItemSchema
);
