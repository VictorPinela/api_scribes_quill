import { Schema, model, Document } from "mongoose";
import { Features, Speeds } from "../types";

export interface SpecieInterface extends Document {
  name: string;
  creatureType: string;
  size: string;
  speeds: Speeds["SpeedsInterface"];
  languages: string[];
  features: Features["FeaturesInterface"];
  description?: string;
}

const SpecieSchema = new Schema<SpecieInterface>(
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
    creatureType: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    speeds: {
      movement: {
        type: Number,
        required: true,
      },
      burrow: {
        type: Number,
        required: false,
      },
      climb: {
        type: Number,
        required: false,
      },
      flyw: {
        type: Number,
        required: false,
      },
      swim: {
        type: Number,
        required: false,
      },
    },
    languages: { type: [String], required: true },
    features: { type: [String], required: false },
    description: { type: String, required: false },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

export const Specie = model<SpecieInterface>("Specie", SpecieSchema);
