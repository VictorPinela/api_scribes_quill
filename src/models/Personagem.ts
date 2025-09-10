import { Schema, model, Document } from 'mongoose';

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
  usuarioId: string;
}

const PersonagemSchema = new Schema<IPersonagem>({
  nome: { type: String, required: true },
  level: { type: Number, required: true, default: 1 },
  classe: { type: String, required: true },
  raca: { type: String, required: true },
  pv: {
    atual: { type: Number, required: true, default: 10 },
    max: { type: Number, required: true, default: 10 },
    temp: { type: Number, default: 0 }
  },
  usuarioId: { type: String, required: true } 
});

export const Personagem = model<IPersonagem>('Personagem', PersonagemSchema);