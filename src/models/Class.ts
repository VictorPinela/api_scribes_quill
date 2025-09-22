import { Schema, model, Document, Types } from "mongoose";

export interface IClass extends Document {
  name: string;
  primaryAbility: string;
  hpDice: string;
  savingThrowProficiencies: string[];
  skillProficiencies: {
    choose: number;
    skills: string[];
  };
  weaponProficiencies: string[];
  toolProficiencies: string[];
  armorProficiencies: string[];
  startingGear: string;
  description?: string;
  featuresPerLevel: [
    {
      level: number;
      feature: string;
    }
  ];
  features: string[];
  subClass: [
    {
      name: string;
      featuresPerLevel: [
        {
          level: number;
          feature: string;
        }
      ];
      features: string[];
    }
  ];
}

const ClassSchema = new Schema<IClass>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    primaryAbility: {
      type: String,
      required: true,
    },

    hpDice: {
      type: String,
      required: true,
    },
    savingThrowProficiencies: [
      {
        type: String,
        required: true,
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
      {
        level: {
          type: Number,
          required: true,
          min: 1,
          max: 20,
        },
        feature: {
          type: String,
          required: true,
        },
      },
    ],
    features: [
      {
        type: String,
        required: true,
      },
    ],
    subClass: [
      {
        name: {
          type: String,
          required: false,
        },
        featuresPerLevel: [
          {
            level: {
              type: Number,
              required: true,
              min: 1,
              max: 20,
            },
            feature: {
              type: String,
              required: true,
            },
          },
        ],
        features: [
          {
            type: String,
            required: true,
          },
        ],
      },
    ],
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

ClassSchema.index({ name: 1 });

export const Class = model<IClass>("Class", ClassSchema);
