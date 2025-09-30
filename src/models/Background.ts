import { Schema, model, Document, Types } from "mongoose";
import { enumSkill, enumStatus, IBackground } from "../types";

const BackgroundSchema = new Schema<IBackground>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    abilityScore: [
      {
        type: String,
        required: true,
        enum: enumStatus,
      },
    ],
    feat: {
      type: String,
      required: true,
    },
    skillProficiencies: [
      {
        type: String,
        required: true,
        enum: enumSkill,
      },
    ],
    toolProficiencies: [
      {
        type: String,
        required: true,
      },
    ],
    equipment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

export const Background = model<IBackground>("Background", BackgroundSchema);
