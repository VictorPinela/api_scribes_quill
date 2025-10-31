import { model, Schema, Document } from "mongoose";
import { Features, Hp, Inventory } from "../types";

export interface ArmorInterface extends Document {
  name: string;
  type: Inventory["Armors"];
  armorClass: Hp["ArmorClassInterface"];
  minStrength?: number;
  stealthDisadvantage: boolean;
  weight: number;
  requiresAttunement: boolean;
  description?: string;
  cost: number;
  features: Features["FeaturesInterface"][];
}

const ArmorSchema = new Schema<ArmorInterface>(
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
    type: {
      type: String,
      required: true,
      index: true,
      enum: Inventory.enumArmors,
    },
    armorClass: { type: Hp.ArmorClassSchema, required: true },
    minStrength: { type: Number, required: false },
    stealthDisadvantage: { type: Boolean, required: true, default: false },
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

export const Armor = model<ArmorInterface>("Armor", ArmorSchema);
