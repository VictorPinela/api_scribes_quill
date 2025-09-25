import { Schema, model, Document, Types } from "mongoose";

export interface IBackground extends Document {
  name: string;
  abilityScore: string[];
  feat: string;
  skillProficiencies: string[];
  toolProficiencies: string[];
  equipment: string;
}

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
      },
    ],
    feat: {
      type: String,
      required: true,
    },
    skillProficiencies: [
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
    equipment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

// BackgroundSchema.index({ name: 1 });

export const Background = model<IBackground>("Background", BackgroundSchema);
