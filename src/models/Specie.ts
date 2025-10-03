import { Schema, model } from "mongoose";
import { ISpecie } from "../types";

const SpecieSchema = new Schema<ISpecie>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    creatureType: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    speed: {
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
    traits: { type: [String], required: false },
    info: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

export const Specie = model<ISpecie>("Specie", SpecieSchema);
