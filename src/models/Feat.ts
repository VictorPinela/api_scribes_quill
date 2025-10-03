import { Schema, model } from "mongoose";
import { enumCategory, IFeat } from "../types";

const benefit = {
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
};

const FeatSchema = new Schema<IFeat>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    category: {
      type: String,
      required: true,
      enum: enumCategory,
    },
    prerequisite: {
      type: [String],
      required: false,
    },
    benefit: {
      type: [benefit],
      required: true,
      _id: false,
    },
    repeatable: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

export const Feat = model<IFeat>("Feat", FeatSchema);
