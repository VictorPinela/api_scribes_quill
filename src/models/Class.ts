import { Schema, model, Document, Types } from "mongoose";
import { enumDice, enumSkill, enumStatus, IClass } from "../types";

const skillProficiencies = {
  choose: {
    type: Number,
    required: true,
  },
  skills: [
    {
      type: String,
      required: true,
      enum: enumSkill,
    },
  ],
};

const featuresPerLevel = [
  {
    level: {
      type: Number,
      required: true,
      min: 1,
      max: 20,
    },
    features: [
      {
        type: String,
        required: true,
      },
    ],
  },
];

const subClass = [
  {
    name: {
      type: String,
      required: false,
    },
    featuresPerLevel: {
      type: featuresPerLevel,
      required: true,
      _id: false,
    },
  },
];

const ClassSchema = new Schema<IClass>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    primaryStatus: {
      type: String,
      required: true,
      enum: enumStatus,
    },
    hpDice: {
      type: String,
      required: true,
      enum: enumDice,
    },
    savingThrowProficiencies: [
      { type: String, required: true, enum: enumStatus },
    ],
    skillProficiencies: {
      type: skillProficiencies,
      required: true,
      _id: false,
    },
    weaponProficiencies: [
      {
        type: String,
        required: true,
      },
    ],
    toolProficiencies: [
      {
        type: String,
        required: true,
      },
    ],
    armorProficiencies: [
      {
        type: String,
        required: true,
      },
    ],
    startingGear: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    featuresPerLevel: {
      type: [featuresPerLevel],
      required: true,
      _id: false,
    },
    subClass: {
      type: [subClass],
      required: true,
      _id: false,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

export const Class = model<IClass>("Class", ClassSchema);
