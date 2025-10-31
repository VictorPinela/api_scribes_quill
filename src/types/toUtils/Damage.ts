import { Schema, Document } from "mongoose";
import { Dice } from "./Dice";

type DamageTypes =
  | "acido"
  | "concussão"
  | "frio"
  | "fogo"
  | "força"
  | "raio"
  | "necrotico"
  | "perfurante"
  | "veneno"
  | "psíquico"
  | "radiante"
  | "cortante"
  | "trovejante";

const enumDamageTypes: DamageTypes[] = [
  "acido",
  "concussão",
  "frio",
  "fogo",
  "força",
  "raio",
  "necrotico",
  "perfurante",
  "veneno",
  "psíquico",
  "radiante",
  "cortante",
  "trovejante",
];

type Ammunition = "flecha" | "dardos" | "fundas" | "virotes";

const enumAmmunition: Ammunition[] = ["flecha", "dardos", "fundas", "virotes"];

const weaponProperties = [
  "acuidade",
  "pesada",
  "leve",
  "recarga",
  "alcance",
  "arremeço",
  "duas mãos",
] as const;

type WeaponProperties =
  | (typeof weaponProperties)[number]
  | `munição (${string})`
  | `distancia (${string})`
  | `versatil (${string})`;

export const createAmmunitionProperty = (
  ammunition: string
): `munição (${string})` => `munição (${ammunition})`;

export const createRangeProperty = (range: string): `distancia (${string})` =>
  `distancia (${range})`;

export const createVersatileProperty = (
  damage: string
): `versatil (${string})` => `versatil (${damage})`;

const enumWeaponProperties = (
  ammunition: string = "flecha",
  range: string = "6/18",
  damage: string = "d6"
) => [
  ...weaponProperties,
  createAmmunitionProperty(ammunition),
  createRangeProperty(range),
  createVersatileProperty(damage),
];

type WeaponMasterys =
  | "cleave"
  | "graze"
  | "nick"
  | "push"
  | "sap"
  | "slow"
  | "topple"
  | "vex";

const enumWeaponMasterys: WeaponMasterys[] = [
  "cleave",
  "graze",
  "nick",
  "push",
  "sap",
  "slow",
  "topple",
  "vex",
];

interface DamageInterface extends Document {
  diceNumber?: number;
  diceType?: Dice["Dices"];
  damageType?: DamageTypes;
  damageNumber?: number;
}

const DamageSchema = new Schema<DamageInterface>(
  {
    diceNumber: { type: Number, required: false, default: 1 },
    diceType: { type: String, required: false, enum: Dice.enumDice },
    damageType: { type: String, required: false, enum: enumDamageTypes },
    damageNumber: { type: Number, required: false, default: 0 },
  },
  {
    _id: false,
  }
);

export const Damage = {
  DamageSchema,
  enumDamageTypes,
  enumWeaponProperties,
  enumWeaponMasterys,
};

export type Damage = {
  DamageInterface: DamageInterface;
  DamageTypes: DamageTypes;
  WeaponProperties: WeaponProperties;
  WeaponMasterys: WeaponMasterys;
};
