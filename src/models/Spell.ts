import { Schema, model, Document, Types } from "mongoose";
import { Magic } from "../types";

export interface SpellInterface extends Document {
  name: string;
  level: number;
  spellSchool: Magic["SpellSchool"];
  classes: Types.ObjectId[];
  castingTime: string;
  range: string;
  component: Magic["ComponentInterface"];
  duration: string;
  description: string;
  savingThrow: boolean;
  attack: boolean;
  higherLevels: string[];
  ritual: boolean;
  concentration: boolean;
}

const SpellSchema = new Schema<SpellInterface>(
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
    level: { type: Number, required: true, min: 0, max: 9, index: true },
    spellSchool: {
      type: String,
      required: true,
      enum: Magic.enumSpellSchool,
      index: true,
    },
    classes: { type: [Schema.Types.ObjectId], ref: "Class", required: false },
    castingTime: { type: String, required: true },
    range: { type: String, required: true },
    component: { type: Magic.ComponentSchema, required: true },
    duration: { type: String, required: true },
    description: { type: String, required: true },
    savingThrow: { type: Boolean, required: true, default: false },
    attack: { type: Boolean, required: true, default: false },
    higherLevels: { type: [String], required: false },
    ritual: { type: Boolean, required: true, default: false },
    concentration: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: false,
    versionKey: false,
    toJSON: {
      virtuals: ["classes"],
    },
  }
);

export const Spell = model<SpellInterface>("Spell", SpellSchema);
