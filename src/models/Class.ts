import { Schema, model, Document, Types } from "mongoose";
import { enumDice, enumSkill, enumStatus, IClass } from "../types";

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
      {
        type: String,
        required: true,
        enum: enumStatus,
      },
    ],
    skillProficiencies: {
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
    featuresPerLevel: [
      new Schema(
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
        { _id: false, required: false }
      ),
    ],
    subClass: [
      new Schema(
        {
          name: {
            type: String,
            required: false,
          },
          featuresPerLevel: [
            new Schema(
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
              { _id: false, required: false }
            ),
          ],
        },
        { _id: false, required: false }
      ),
    ],
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

export const Class = model<IClass>("Class", ClassSchema);
