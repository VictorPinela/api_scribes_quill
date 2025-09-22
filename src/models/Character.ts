import { Schema, model, Document, Types } from "mongoose";

export interface ICharacter extends Document {
  name: string;
  level: number;
  class: Types.ObjectId;
  subClass: string;
  specie: Types.ObjectId;
  background: Types.ObjectId;
  alignment?: string;
  experience: number;
  hp: {
    current: number;
    max: number;
    temporary: number;
  };
  stats: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  skills: {
    acrobatics: boolean;
    animalHandling: boolean;
    arcana: boolean;
    athletics: boolean;
    deception: boolean;
    history: boolean;
    insight: boolean;
    intimidation: boolean;
    investigation: boolean;
    medicine: boolean;
    nature: boolean;
    perception: boolean;
    performance: boolean;
    persuasion: boolean;
    religion: boolean;
    sleightOfHand: boolean;
    stealth: boolean;
    survival: boolean;
  };
  proficiencies: {
    armor: string[];
    weapons: string[];
    tools: string[];
    languages: string[];
  };
  personalCharacteristics?: {
    traits: string;
    ideals: string;
    bonds: string;
    flaws: string;
  };
  feats: string[];
  backpack: {
    equipment: {
      armor?: [
        {
          name: string;
          quantity: number;
          tipe: string;
          armorClass: string;
          minStrength?: number;
          stealthDisadvantage: boolean;
          weight: number;
          equiped: boolean;
          requiresAttunement: boolean;
        }
      ];
      shield?: [
        {
          name: string;
          quantity: number;
          armorClass: string;
          weight: number;
          equiped: boolean;
          requiresAttunement: boolean;
        }
      ];
      weapon?: [
        {
          name: string;
          quantity: number;
          tipe: string;
          damageDice: string;
          damageTipe: string;
          properties: string;
          mastery: string;
          weight: number;
          equiped: boolean;
          dualHanded: boolean;
          munition: number;
          requiresAttunement: boolean;
        }
      ];
      rightHand: string;
      lefttHand: string;
      attuned: string[];
    };
    items?: Array<{
      name: string;
      quantity: number;
      weight: number;
      description?: string;
    }>;
    currency: {
      copper: number;
      silver: number;
      electrum: number;
      gold: number;
      platinum: number;
    };
  };
  spells?: {
    spellcastingAbility: string;
    spellSaveDC: number;
    spellAttackBonus: number;
    known: Types.ObjectId[];
    prepared: Types.ObjectId[];
    slots: Array<{
      level: number;
      total: number;
      used: number;
    }>;
  };
  appearance?: {
    age: number;
    height: string;
    weight: string;
    eyes: string;
    skin: string;
    hair: string;
    description: string;
    gender: string;
  };
  backstory?: string;
  userId: Types.ObjectId;
  createdAt?: string;
}

const CharacterSchema = new Schema<ICharacter>(
  {
    name: { type: String, required: true },
    level: { type: Number, required: true, default: 1 },
    class: {
      type: Schema.Types.ObjectId,
      ref: "Class",
    },
    subClass: { type: String, required: false },
    specie: {
      type: Schema.Types.ObjectId,
      ref: "Specie",
    },
    background: {
      type: Schema.Types.ObjectId,
      ref: "Background",
    },
    alignment: { type: String, required: false },
    experience: { type: Number, required: true, default: 0 },
    hp: {
      current: { type: Number, required: true, default: 10 },
      max: { type: Number, required: true, default: 10 },
      temporary: { type: Number, required: true, default: 0 },
    },
    stats: {
      strength: { type: Number, required: true, default: 10 },
      dexterity: { type: Number, required: true, default: 10 },
      constitution: { type: Number, required: true, default: 10 },
      intelligence: { type: Number, required: true, default: 10 },
      wisdom: { type: Number, required: true, default: 10 },
      charisma: { type: Number, required: true, default: 10 },
    },
    skills: {
      acrobatics: { type: Boolean, required: true, default: false },
      animalHandling: { type: Boolean, required: true, default: false },
      arcana: { type: Boolean, required: true, default: false },
      athletics: { type: Boolean, required: true, default: false },
      deception: { type: Boolean, required: true, default: false },
      history: { type: Boolean, required: true, default: false },
      insight: { type: Boolean, required: true, default: false },
      intimidation: { type: Boolean, required: true, default: false },
      investigation: { type: Boolean, required: true, default: false },
      medicine: { type: Boolean, required: true, default: false },
      nature: { type: Boolean, required: true, default: false },
      perception: { type: Boolean, required: true, default: false },
      performance: { type: Boolean, required: true, default: false },
      persuasion: { type: Boolean, required: true, default: false },
      religion: { type: Boolean, required: true, default: false },
      sleightOfHand: { type: Boolean, required: true, default: false },
      stealth: { type: Boolean, required: true, default: false },
      survival: { type: Boolean, required: true, default: false },
    },
    proficiencies: {
      armor: { type: [String], required: true },
      weapons: { type: [String], required: true },
      tools: { type: [String], required: true },
      languages: { type: [String], required: true },
    },
    personalCharacteristics: {
      traits: { type: String, required: false },
      ideals: { type: String, required: false },
      bonds: { type: String, required: false },
      flaws: { type: String, required: false },
    },
    feats: { type: [String], required: true },
    backpack: {
      equipment: {
        armor: [
          new Schema(
            {
              name: { type: String, required: true, unique: true },
              quantity: { type: Number, required: true },
              type: { type: String, required: true },
              armorClass: { type: String, required: true },
              minStrength: { type: Number, required: false },
              stealthDisadvantage: { type: Boolean, required: true },
              weight: { type: Number, required: true },
              equipped: { type: Boolean, required: true },
              requiresAttunement: { type: Boolean, required: true },
            },
            { _id: false, required: false }
          ),
        ],
        shield: [
          new Schema(
            {
              name: { type: String, required: true, unique: true },
              quantity: { type: Number, required: true },
              armorClass: { type: String, required: true },
              weight: { type: Number, required: true },
              equipped: { type: Boolean, required: true },
              requiresAttunement: { type: Boolean, required: true },
            },
            { _id: false, required: false }
          ),
        ],
        weapon: [
          new Schema(
            {
              name: { type: String, required: true, unique: true },
              quantity: { type: Number, required: true },
              type: { type: String, required: true },
              damageDice: { type: String, required: true },
              damageTipe: { type: String, required: true },
              properties: { type: String, required: true },
              mastery: { type: String, required: true },
              weight: { type: Number, required: true },
              equipped: { type: Boolean, required: true },
              dualHanded: { type: Boolean, required: true },
              munition: { type: Number, required: false },
              requiresAttunement: { type: Boolean, required: true },
            },
            { _id: false, required: false }
          ),
        ],
        rightHand: { type: String, required: true },
        lefttHand: { type: String, required: true },
        attuned: { type: [String], required: true },
      },
      items: [
        new Schema(
          {
            name: { type: String, required: true, unique: true },
            quantity: { type: Number, required: true },
            weight: { type: Number, required: true },
            description: { type: String, required: true },
          },
          { _id: false, required: false }
        ),
      ],
      currency: {
        copper: { type: Number, required: true, default: 0 },
        silver: { type: Number, required: true, default: 0 },
        electrum: { type: Number, required: true, default: 0 },
        gold: { type: Number, required: true, default: 0 },
        platinum: { type: Number, required: true, default: 0 },
      },
    },
    spells: {
      spellcastingAbility: {
        type: String,
        enum: [
          "strength",
          "dexterity",
          "constitution",
          "intelligence",
          "wisdom",
          "charisma",
        ],
        required: false,
      },
      spellSaveDC: { type: Number, required: true, default: 8 },
      spellAttackBonus: { type: Number, required: true, default: 2 },
      slots: [
        new Schema(
          {
            level: { type: Number, required: true, min: 1, max: 9 },
            total: { type: Number, required: true, min: 0 },
            used: { type: Number, required: true, min: 0, default: 0 },
          },
          { _id: false, required: false }
        ),
      ],
      known: [
        {
          type: Schema.Types.ObjectId,
          ref: "Spell",
        },
      ],
      prepared: [
        {
          type: Schema.Types.ObjectId,
          ref: "Spell",
        },
      ],
    },
    appearance: {
      age: { type: Number, required: false },
      height: { type: String, required: false },
      weight: { type: String, required: false },
      eyes: { type: String, required: false },
      skin: { type: String, required: false },
      hair: { type: String, required: false },
      description: { type: String, required: false },
      gender: { type: String, required: false },
    },
    backstory: { type: String, required: false },
    userId: { type: Schema.Types.ObjectId, ref: "Character", required: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
  }
);

export const Character = model<ICharacter>("Character", CharacterSchema);
