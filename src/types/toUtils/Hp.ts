import { Schema, Document } from "mongoose";

interface HpInterface extends Document {
  current: number;
  max: number;
  temporary: number;
}

const HpSchema = new Schema<HpInterface>(
  {
    current: { type: Number, required: true, default: 8 },
    max: { type: Number, required: true, default: 8 },
    temporary: { type: Number, required: true, default: 0 },
  },
  {
    _id: false,
  }
);

interface ArmorClassInterface extends Document {
  base: number;
  addDex: boolean;
  maxDex?: number;
}

const ArmorClassSchema = new Schema<ArmorClassInterface>(
  {
    base: { type: Number, required: true, default: 11 },
    addDex: { type: Boolean, required: true, default: false },
    maxDex: { type: Number, required: false, default: 0 },
  },
  {
    _id: false,
  }
);

export const Hp = {
  HpSchema,
  ArmorClassSchema,
};

export type Hp = {
  HpInterface: HpInterface;
  ArmorClassInterface: ArmorClassInterface;
};
