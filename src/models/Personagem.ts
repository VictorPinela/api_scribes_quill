import { Schema, model, Document, Types } from "mongoose";

interface IPersonagem extends Document {
  nome: string;
  level: number;
  classe: string;
  raca: string;
  pv: {
    atual: number;
    max: number;
    temp: number;
  };
  usuarioId: Types.ObjectId;
}

const PersonagemSchema = new Schema<IPersonagem>(
  {
    nome: { type: String, required: true },
    level: { type: Number, required: true, default: 1 },
    classe: { type: String, required: true },
    raca: { type: String, required: true },
    pv: {
      atual: { type: Number, required: true, default: 10 },
      max: { type: Number, required: true, default: 10 },
      temp: { type: Number, default: 0 },
    },
    usuarioId: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
  },
  { versionKey: false }
);

export const Personagem = model<IPersonagem>("Personagem", PersonagemSchema);
