import { Schema, model, Document, Types } from "mongoose";

export interface IStats {
  value: number;
  modifier: number;
  savingThrows: boolean;
}

const statsModel = {
  value: { type: Number, required: true, min: 1, max: 30, defaut: 10 },
  modifier: { type: Number, required: true },
  savingThrows: { type: Boolean, required: true, default: false },
};

export interface ISkills {
  stats: string;
  proficient: boolean;
  expertise: boolean;
  modifier: number;
}

const skillModel = {
  stats: { type: String, required: true },
  proficient: { type: Boolean, required: true, default: false },
  expertise: { type: Boolean, required: true, default: false },
  modifier: { type: Number, required: true },
};
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
  armorClass: number;
  initiative: number;
  speed: number;
  stats: {
    strength: IStats;
    dexterity: IStats;
    constitution: IStats;
    intelligence: IStats;
    wisdom: IStats;
    charisma: IStats;
  };
  skills: {
    acrobatics: ISkills;
    animalHandling: ISkills;
    arcana: ISkills;
    athletics: ISkills;
    deception: ISkills;
    history: ISkills;
    insight: ISkills;
    intimidation: ISkills;
    investigation: ISkills;
    medicine: ISkills;
    nature: ISkills;
    perception: ISkills;
    performance: ISkills;
    persuasion: ISkills;
    religion: ISkills;
    sleightOfHand: ISkills;
    stealth: ISkills;
    survival: ISkills;
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
  inventory: {
    equipment: {
      armor?: [
        {
          name: string;
          quantity: number;
          type: string;
          armorClass: string;
          minStrength?: number;
          stealthDisadvantage: boolean;
          weight: number;
          equipped: boolean;
          requiresAttunement: boolean;
        }
      ];
      shield?: [
        {
          name: string;
          quantity: number;
          armorClass: string;
          weight: number;
          equipped: boolean;
          requiresAttunement: boolean;
        }
      ];
      weapon?: [
        {
          name: string;
          quantity: number;
          type: string;
          damageDice: string;
          damageTipe: string;
          properties: string;
          mastery: string;
          weight: number;
          equipped: boolean;
          dualHanded: boolean;
          munition: number;
          requiresAttunement: boolean;
        }
      ];
      magicItems: [
        {
          name: string;
          quantity: number;
          weight: number;
          equipped: boolean;
          requiresAttunement: boolean;
          description: string;
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
    spells: Types.ObjectId[];
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
    name: { type: String, required: true, trim: true, toLowerCase: true },
    level: { type: Number, required: true, default: 1 },
    class: {
      type: Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    subClass: { type: String, required: false },
    specie: {
      type: Schema.Types.ObjectId,
      ref: "Specie",
      required: true,
    },
    background: {
      type: Schema.Types.ObjectId,
      ref: "Background",
      required: true,
    },
    alignment: {
      type: String,
      required: false,
      enum: ["LG", "LN", "LE", "NG", "NN", "NE", "CG", "CN", "CE"],
    },
    experience: { type: Number, required: true, default: 0 },
    hp: {
      current: { type: Number, required: true, default: 10 },
      max: { type: Number, required: true, default: 10 },
      temporary: { type: Number, required: true, default: 0 },
    },
    armorClass: { type: Number, required: true, default: 10 },
    initiative: { type: Number, default: 0 },
    speed: { type: Number, required: true, min: 0 },
    stats: {
      strength: { type: statsModel, reuired: true, _id: false },
      dexterity: { type: statsModel, reuired: true, _id: false },
      constitution: { type: statsModel, reuired: true, _id: false },
      intelligence: { type: statsModel, reuired: true, _id: false },
      wisdom: { type: statsModel, reuired: true, _id: false },
      charisma: { type: statsModel, reuired: true, _id: false },
    },
    skills: {
      acrobatics: { type: skillModel, reuired: true, _id: false },
      animalHandling: { type: skillModel, reuired: true, _id: false },
      arcana: { type: skillModel, reuired: true, _id: false },
      athletics: { type: skillModel, reuired: true, _id: false },
      deception: { type: skillModel, reuired: true, _id: false },
      history: { type: skillModel, reuired: true, _id: false },
      insight: { type: skillModel, reuired: true, _id: false },
      intimidation: { type: skillModel, reuired: true, _id: false },
      investigation: { type: skillModel, reuired: true, _id: false },
      medicine: { type: skillModel, reuired: true, _id: false },
      nature: { type: skillModel, reuired: true, _id: false },
      perception: { type: skillModel, reuired: true, _id: false },
      performance: { type: skillModel, reuired: true, _id: false },
      persuasion: { type: skillModel, reuired: true, _id: false },
      religion: { type: skillModel, reuired: true, _id: false },
      sleightOfHand: { type: skillModel, reuired: true, _id: false },
      stealth: { type: skillModel, reuired: true, _id: false },
      survival: { type: skillModel, reuired: true, _id: false },
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
    inventory: {
      equipment: {
        armor: [
          new Schema(
            {
              name: {
                type: String,
                required: true,
                unique: true,
                trim: true,
                toLowerCase: true,
              },
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
              name: {
                type: String,
                required: true,
                unique: true,
                trim: true,
                toLowerCase: true,
              },
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
              name: {
                type: String,
                required: true,
                unique: true,
                trim: true,
                toLowerCase: true,
              },
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
        magicItems: [
          new Schema(
            {
              name: {
                type: String,
                required: true,
                unique: true,
                trim: true,
                toLowerCase: true,
              },
              quantity: { type: Number, required: true },
              weight: { type: Number, required: true },
              equipped: { type: Boolean, required: true },
              requiresAttunement: { type: Boolean, required: true },
              description: { type: String, required: true },
            },
            { _id: false, required: false }
          ),
        ],
        rightHand: { type: String, required: true, defaut: "livre" },
        lefttHand: { type: String, required: true, defaut: "livre" },
        attuned: { type: [String], required: true },
      },
      items: [
        new Schema(
          {
            name: {
              type: String,
              required: true,
              unique: true,
              trim: true,
              toLowerCase: true,
            },
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
      spells: [
        {
          type: Schema.Types.ObjectId,
          ref: "Spell",
          required: true,
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
    toJSON: {
      virtuals: ["class", "specie", "background", "spells.spells", "userId"],
    },
  }
);

export const Character = model<ICharacter>("Character", CharacterSchema);
