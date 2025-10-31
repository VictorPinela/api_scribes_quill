import { Schema, model, Document } from "mongoose";
import {
  Ability,
  Dice,
  Features,
  Inventory,
  Proficiencies,
  Skill,
  SubClass,
} from "../types";

export interface ClassInterface extends Document {
  name: string;
  primaryAbility: Ability["Abilities"];
  hpDice: Dice["Dices"];
  savingThrowProficiencies: Ability["Abilities"][];
  skillProficiencies: Skill["ClassesSkillsInterface"];
  proficiencies: Proficiencies["ProficienciesInterface"];
  startingGear: Inventory["InventoryInterface"][];
  featuresPerLevel: Features["FeaturesPerLevelInterface"][];
  subClasses: SubClass["SubClassInterface"][];
  description?: string;
}

const ClassSchema = new Schema<ClassInterface>(
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
    primaryAbility: {
      type: String,
      required: true,
      enum: Ability.enumAbilities,
    },
    hpDice: {
      type: String,
      required: true,
      enum: Dice.enumDice,
    },
    savingThrowProficiencies: {
      type: [String],
      required: true,
      enum: Ability.enumAbilities,
    },
    skillProficiencies: {
      type: Skill.ClassesSkillsSchema,
      required: true,
    },
    proficiencies: {
      type: Proficiencies.ProficienciesSchema,
      required: true,
    },
    startingGear: {
      type: [Inventory.InventorySchema],
      required: true,
    },
    featuresPerLevel: {
      type: [Features.FeaturesPerLevelSchema],
      required: true,
    },
    subClasses: {
      type: [SubClass.SubClassSchema],
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
  }
);

export const Class = model<ClassInterface>("Class", ClassSchema);
