import { Schema, model } from "mongoose";
import { ISpell } from "../types";

const SpellSchema = new Schema<ISpell>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    level: {
      type: Number,
      required: true,
      min: 0,
      max: 9,
      index: true,
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
      index: true,
    },
    class: {
      type: [String],
      required: true,
    },
    prepared: { type: Boolean, required: true, default: false },
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

// SpellSchema.index({ name: 1, level: 1, school: 1 });

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
