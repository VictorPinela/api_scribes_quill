import { Schema, model, Document, Types } from "mongoose";

interface ICharacter extends Document {
  name: string;
  level: number;
  class: string;
  race: string;
  hp: {
    current: number;
    max: number;
    temporary: number;
  };
  userId: Types.ObjectId;
}

const CharacterSchema = new Schema<ICharacter>(
  {
    name: { type: String, required: true },
    level: { type: Number, required: true, default: 1 },
    class: { type: String, required: true },
    race: { type: String, required: true },
    hp: {
      current: { type: Number, required: true, default: 10 },
      max: { type: Number, required: true, default: 10 },
      temporary: { type: Number, default: 0 },
    },
    userId: { type: Schema.Types.ObjectId, ref: "Character", required: true },
  },
  { versionKey: false }
);

export const Character = model<ICharacter>("Character", CharacterSchema);
