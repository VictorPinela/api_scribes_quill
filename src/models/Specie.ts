import { Schema, model, Document, Types } from "mongoose";

export interface ISpecie extends Document {
  name: string;
  creatureType: string;
  size: string;
  speed: {
    movement: number;
    burrow?: number;
    climb?: number;
    flyw?: number;
    swim?: number;
  };
  languages: string[];
  traits?: string[];
  info?: string;
}
const SpecieSchema = new Schema<ISpecie>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
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

SpecieSchema.index({ name: 1 });

export const Specie = model<ISpecie>("Specie", SpecieSchema);
