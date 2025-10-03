import { Schema, model } from "mongoose";
import { IItem } from "../types";

const ItemSchema = new Schema<IItem>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    quantity: {
      type: Number,
      required: false,
    },
    weight: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    cost: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

export const Item = model<IItem>("Item", ItemSchema);
