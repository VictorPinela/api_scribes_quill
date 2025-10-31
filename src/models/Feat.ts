import { Document, Schema, model } from "mongoose";
import { FeatCategory, Features } from "../types";

export interface FeatInterface extends Document {
  name: string;
  category: FeatCategory["FeatCategories"];
  prerequisites: string[];
  benefits: Features["FeaturesInterface"][];
  repeatable: boolean;
  description?: string;
}

const FeatSchema = new Schema<FeatInterface>(
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
    category: {
      type: String,
      required: true,
      enum: FeatCategory.enumFeatCategory,
    },
    prerequisites: { type: [String], required: false },
    benefits: {
      type: [Features.FeaturesSchema],
      required: true,
    },
    repeatable: { type: Boolean, required: true, default: false },
    description: { type: String, required: false },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

export const Feat = model<FeatInterface>("Feat", FeatSchema);
