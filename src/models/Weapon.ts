import { Document, Schema, model } from "mongoose";
import { Damage, Features, Inventory } from "../types";

export interface WeaponInterface extends Document {
  name: string;
  type: Inventory["Weapons"];
  damages: Damage["DamageInterface"][];
  properties: Damage["WeaponProperties"][];
  mastery: Damage["WeaponMasterys"];
  weight: number;
  requiresAttunement: boolean;
  description?: string;
  cost: number;
  features: Features["FeaturesInterface"][];
}

const WeaponSchema = new Schema<WeaponInterface>(
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
    type: { type: String, required: true, enum: Inventory.enumWeapons },
    damages: { type: [Damage.DamageSchema], required: true },
    properties: {
      type: [String],
      required: true,
    },
    mastery: { type: String, required: true, enum: Damage.enumWeaponMasterys },
    weight: { type: Number, required: true, default: 0 },
    requiresAttunement: { type: Boolean, required: true, default: false },
    description: { type: String, required: false },
    cost: { type: Number, required: true, default: 0 },
    features: { type: [Features.FeaturesSchema], required: true },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

WeaponSchema.pre<WeaponInterface>("save", async function (next) {
  if (!this.isModified("properties")) return next();
  const newProperties: Damage["WeaponProperties"][] = [];
  try {
    for (let i = 0; i < this.properties.length; i++) {
      const propertie = this.properties[i];
      if (!propertie) continue;
      const str = propertie.match(/.* \((.*)\)/);
      if (str) {
        Damage.enumWeaponProperties(str[1], str[1], str[1]).some((value) => {
          if (propertie.includes(value)) {
            newProperties.push(propertie);
            return true;
          }
          return false;
        });
        continue;
      } else {
        Damage.enumWeaponProperties().some((value) => {
          if (propertie.includes(value)) {
            newProperties.push(propertie);
            return true;
          }
          return false;
        });
        continue;
      }
    }
    if (newProperties.length != this.properties.length) {
      const err = this.properties.filter(
        (item) => !newProperties.includes(item)
      );
      throw new Error(`Erro na propriedade ${err}`);
    }
    this.properties = newProperties;
    next();
  } catch (error: any) {
    next(error);
  }
});

export const Weapon = model<WeaponInterface>("Weapon", WeaponSchema);
