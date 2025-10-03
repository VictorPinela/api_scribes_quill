import { Schema, model } from "mongoose";
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
      type: Schema.Types.ObjectId,
      ref: "Feat",
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
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: false,
    versionKey: false,
    toJSON: {
      virtuals: ["feat"],
    },
  }
);

export const Background = model<IBackground>("Background", BackgroundSchema);
