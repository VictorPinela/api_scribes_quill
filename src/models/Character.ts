import { Document, Schema, Types, model } from "mongoose";
import {
  Ability,
  Alignment,
  Appearance,
  Hp,
  Inventory,
  Magic,
  PersonalCharacteristics,
  Proficiencies,
  Skill,
  Speeds,
  SubClass,
} from "../types";

export interface CharacterInterface extends Document {
  name: string;
  level: number;
  class: Types.ObjectId;
  subClass?: SubClass["SubClassInterface"];
  specie: Types.ObjectId;
  background: Types.ObjectId;
  alignment?: Alignment["Alignments"];
  experience: number;
  hp: Hp["HpInterface"];
  armorClass: number;
  initiative: number;
  speeds: Speeds["SpeedsInterface"];
  abilities: Ability["AbilitiesInterface"];
  skills: Skill["SkillsInterface"];
  proficiencies: Proficiencies["ProficienciesInterface"];
  personalCharacteristics?: PersonalCharacteristics["PersonalCharacteristicsInterface"];
  feats?: Types.ObjectId[];
  inventory: Inventory["InventoryInterface"];
  magic?: Magic["MagicInterface"];
  spells?: Types.ObjectId[];
  appearance?: Appearance["AppearanceInterface"];
  backstory?: string;
  userId: Types.ObjectId;
}

const CharacterSchema = new Schema<CharacterInterface>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
      lowercase: true,
    },
    level: { type: Number, required: true, default: 1 },
    class: { type: Schema.Types.ObjectId, ref: "Class", required: true },
    subClass: { type: SubClass.SubClassSchema, required: false },
    specie: { type: Schema.Types.ObjectId, ref: "Specie", required: true },
    background: {
      type: Schema.Types.ObjectId,
      ref: "Background",
      required: true,
    },
    alignment: {
      type: String,
      required: false,
      enum: Alignment.enumAlignments,
    },
    experience: { type: Number, required: true, default: 0 },
    hp: { type: Hp.HpSchema, required: true },
    armorClass: { type: Number, required: true, default: 10 },
    initiative: { type: Number, default: 0 },
    speeds: { type: Speeds.SpeedsSchema, required: true },
    abilities: { type: Ability.AbilitiesSchema, required: true },
    skills: { type: Skill.SkillsSchema, required: true },
    proficiencies: { type: Proficiencies.ProficienciesSchema, required: true },
    personalCharacteristics: {
      type: PersonalCharacteristics.PersonalCharacteristicsSchema,
      required: false,
    },
    feats: { type: [Schema.Types.ObjectId], ref: "Feat", required: false },
    inventory: { type: Inventory.InventorySchema, required: true },
    magic: { type: Magic.MagicSchema, required: false },
    spells: {
      type: [Schema.Types.ObjectId],
      ref: "Spell",
      required: false,
    },
    appearance: { type: Appearance.AppearanceSchema, required: false },
    backstory: { type: String, required: false },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Character",
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
    toJSON: {
      virtuals: ["class", "specie", "background", "feats", "spells", "userId"],
    },
  }
);

export const Character = model<CharacterInterface>(
  "Character",
  CharacterSchema
);
