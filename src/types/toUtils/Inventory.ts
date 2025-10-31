import { Document, Schema, Types } from "mongoose";

type Coins = "cobre" | "prata" | "electro" | "ouro" | "platina";

const enumCoins: Coins[] = ["cobre", "prata", "electro", "ouro", "platina"];

type Currency = "pc" | "pp" | "pe" | "po" | "pl";

const enumCurrency: Currency[] = ["pc", "pp", "pe", "po", "pl"];

type Armors = "leve" | "media" | "pesada";

const enumArmors: Armors[] = ["leve", "media", "pesada"];

type Weapons =
  | "simples corpo-a-corpo"
  | "simples distancia"
  | "marcial corpo-a-corpo"
  | "marcial distancia";

const enumWeapons: Weapons[] = [
  "simples corpo-a-corpo",
  "simples distancia",
  "marcial corpo-a-corpo",
  "marcial distancia",
];

interface EquippedInHandInterface extends Document {
  shield?: Types.ObjectId;
  wepon?: Types.ObjectId;
}

const EquippedInHandSchema = new Schema<EquippedInHandInterface>(
  {
    shield: {
      type: Schema.Types.ObjectId,
      ref: "Shield",
      required: false,
    },
    wepon: {
      type: Schema.Types.ObjectId,
      ref: "Weapon",
      required: false,
    },
  },
  {
    _id: false,
  }
);

interface InventoryArmor extends Document {
  armor: Types.ObjectId;
  quantity: number;
  equipped: boolean;
}

const InventoryArmorSchema = new Schema<InventoryArmor>(
  {
    armor: { type: Schema.Types.ObjectId, ref: "Armor", required: false },
    quantity: { type: Number, required: true, default: 0 },
    equipped: { type: Boolean, required: true, default: false },
  },
  {
    _id: false,
    toJSON: {
      virtuals: ["armor"],
    },
  }
);

interface InventoryShield extends Document {
  shield: Types.ObjectId;
  quantity: number;
  equipped: boolean;
}

const InventoryShieldSchema = new Schema<InventoryShield>(
  {
    shield: { type: Schema.Types.ObjectId, ref: "Shield", required: false },
    quantity: { type: Number, required: true, default: 0 },
    equipped: { type: Boolean, required: true, default: false },
  },
  {
    _id: false,
    toJSON: {
      virtuals: ["shield"],
    },
  }
);

interface InventoryWeapon extends Document {
  weapon: Types.ObjectId;
  quantity: number;
  equipped: boolean;
  dualHanded: boolean;
  amunition?: number;
}

const InventoryWeaponSchema = new Schema<InventoryWeapon>(
  {
    weapon: { type: Schema.Types.ObjectId, ref: "Weapon", required: false },
    quantity: { type: Number, required: true, default: 0 },
    equipped: { type: Boolean, required: true, default: false },
    dualHanded: { type: Boolean, required: true, default: false },
    amunition: { type: Number, required: false, default: 0 },
  },
  {
    _id: false,
    toJSON: {
      virtuals: ["weapon"],
    },
  }
);

interface InventoryMagicItems extends Document {
  magicItems: Types.ObjectId;
  quantity: number;
  equipped: boolean;
}

const InventoryMagicItemsSchema = new Schema<InventoryMagicItems>(
  {
    magicItems: {
      type: Schema.Types.ObjectId,
      ref: "MagicItems",
      required: false,
    },
    quantity: { type: Number, required: true, default: 0 },
    equipped: { type: Boolean, required: true, default: false },
  },
  {
    _id: false,
    toJSON: {
      virtuals: ["magicItems"],
    },
  }
);

interface EquipmentInterface extends Document {
  armors?: InventoryArmor[];
  shields?: InventoryShield[];
  weapons?: InventoryWeapon[];
  magicItems?: InventoryMagicItems[];
  rightHand: EquippedInHandInterface;
  lefttHand: EquippedInHandInterface;
  attuned: string[];
}

const EquipmentSchema = new Schema<EquipmentInterface>(
  {
    armors: {
      type: [InventoryArmorSchema],
      required: false,
    },
    shields: {
      type: [InventoryShieldSchema],
      required: false,
    },
    weapons: {
      type: [InventoryWeaponSchema],
      required: false,
    },
    magicItems: {
      type: [InventoryMagicItemsSchema],
      required: false,
    },
    rightHand: { type: EquippedInHandSchema, required: true },
    lefttHand: { type: EquippedInHandSchema, required: true },
    attuned: { type: [String], required: true, maxLength: 3 },
  },
  {
    _id: false,
  }
);

interface WalletInterface extends Document {
  copper: number;
  silver: number;
  electrum: number;
  gold: number;
  platinum: number;
}

const WalletSchema = new Schema<WalletInterface>(
  {
    copper: { type: Number, required: true, default: 0 },
    silver: { type: Number, required: true, default: 0 },
    electrum: { type: Number, required: true, default: 0 },
    gold: { type: Number, required: true, default: 0 },
    platinum: { type: Number, required: true, default: 0 },
  },
  {
    _id: false,
  }
);

interface InventoryInterface extends Document {
  equipment: EquipmentInterface;
  items?: Types.ObjectId[];
  wallet: WalletInterface;
}

const InventorySchema = new Schema<InventoryInterface>(
  {
    equipment: { type: EquipmentSchema, required: true },
    items: {
      type: [Schema.Types.ObjectId],
      ref: "Item",
      required: false,
    },
    wallet: { type: WalletSchema, required: true },
  },
  {
    _id: false,
  }
);

export const Inventory = {
  enumCurrency,
  enumCoins,
  enumArmors,
  enumWeapons,
  EquippedInHandSchema,
  EquipmentSchema,
  WalletSchema,
  InventorySchema,
  InventoryArmorSchema,
  InventoryShieldSchema,
  InventoryWeaponSchema,
  InventoryMagicItemsSchema,
};

export type Inventory = {
  Coins: Coins;
  Currency: Currency;
  Armors: Armors;
  Weapons: Weapons;
  EquippedInHandInterface: EquippedInHandInterface;
  EquipmentInterface: EquipmentInterface;
  WalletInterface: WalletInterface;
  InventoryInterface: InventoryInterface;
  InventoryArmor: InventoryArmor;
  InventoryShield: InventoryShield;
  InventoryWeapon: InventoryWeapon;
  InventoryMagicItems: InventoryMagicItems;
};
