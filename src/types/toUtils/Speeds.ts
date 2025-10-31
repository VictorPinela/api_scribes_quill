import { Schema, Document } from "mongoose";

interface SpeedsInterface extends Document {
  movement: number;
  burrow?: number;
  climb?: number;
  flyw?: number;
  swim?: number;
}

const SpeedsSchema = new Schema<SpeedsInterface>(
  {
    movement: { type: Number, required: true },
    burrow: { type: Number, required: false },
    climb: { type: Number, required: false },
    flyw: { type: Number, required: false },
    swim: { type: Number, required: false },
  },
  {
    _id: false,
  }
);

export const Speeds = {
  SpeedsSchema,
};

export type Speeds = {
  SpeedsInterface: SpeedsInterface;
};
