import { model, Schema, Types, Document } from "mongoose";
import { Ability, Inventory, Skill } from "../types";

export interface BackgroundInterface extends Document {
  name: string;
  abilitiesImprovement: Ability["Abilities"][];
  feat: Types.ObjectId;
  skills: Skill["Skills"][];
  tools: Types.ObjectId[];
  equipmentOptions: Inventory["InventoryInterface"][];
  description?: string;
}

const BackgroundSchema = new Schema<BackgroundInterface>(
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
    abilitiesImprovement: {
      type: [String],
      required: true,
      enum: Ability.enumAbilities,
    },
    feat: {
      type: Schema.Types.ObjectId,
      ref: "Feat",
      required: true,
    },
    skills: {
      type: [String],
      required: true,
      enum: Skill.enumSkill,
    },
    tools: {
      type: [Schema.Types.ObjectId],
      ref: "Tool",
      required: true,
    },
    equipmentOptions: {
      type: [Inventory.InventorySchema],
      required: true,
    },
    description: { type: String, required: false },
  },
  {
    timestamps: false,
    versionKey: false,
    toJSON: {
      virtuals: ["feat", "tools"],
    },
  }
);

export const Background = model<BackgroundInterface>(
  "Background",
  BackgroundSchema
);
