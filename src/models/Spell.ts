import { Schema, model, Document, Types } from "mongoose";

export interface ISpell extends Document {
  name: string;
  level: number;
  school: string;
  class: string[];
  castingTime: string;
  range: string;
  component: {
    verbal: boolean;
    somatic: boolean;
    material?: string;
  };
  duration: string;
  description: string;
  savingThrow: boolean;
  attack: boolean;
  higherLevels?: string[];
  ritual: boolean;
  concentration: boolean;
  //   uperrCasting(candidatePassword: string): Promise<boolean>;
}

const SpellSchema = new Schema<ISpell>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    level: {
      type: Number,
      required: true,
      min: 0,
      max: 9,
    },
    school: {
      type: String,
      required: true,
      enum: [
        "Abjuration",
        "Conjuration",
        "Divination",
        "Enchantment",
        "Evocation",
        "Illusion",
        "Necromancy",
        "Transmutation",
      ],
    },
    class: {
      type: [String],
      required: true,
    },
    castingTime: {
      type: String,
      required: true,
    },
    range: {
      type: String,
      required: true,
    },
    component: {
      verbal: {
        type: Boolean,
        required: true,
      },
      somatic: {
        type: Boolean,
        required: true,
      },
      material: {
        type: String,
        required: false,
      },
    },
    duration: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    savingThrow: {
      type: Boolean,
      required: true,
    },
    attack: {
      type: Boolean,
      required: true,
    },
    higherLevels: {
      type: [String],
      required: false,
    },
    ritual: {
      type: Boolean,
      required: true,
    },
    concentration: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

SpellSchema.index({ name: 1, level: 1, school: 1 });

// SpellSchema.methods.uperrCasting = async function (
//   candidatePassword: string
// ): Promise<boolean> {
//   try {
//     return await bcrypt.compare(candidatePassword, this.password);
//   } catch {
//     throw new Error("Erro ao comparar senhas");
//   }
// };

export const Spell = model<ISpell>("Spell", SpellSchema);
