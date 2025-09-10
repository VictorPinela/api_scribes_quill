import { Schema, model, Document, Types } from "mongoose";
import bcrypt from "bcryptjs";

interface IUsuario extends Document {
  nome: string;
  email: string;
  senha: string;
  personagens: Types.ObjectId[];
  compararSenha(senhaEnviada: string): Promise<boolean>;
}

const UsuarioSchema = new Schema<IUsuario>(
  {
    nome: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    },
    senha: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

UsuarioSchema.virtual(`personagens`, {
  ref: "Personagem",
  localField: "_id",
  foreignField: "usuarioId",
});

UsuarioSchema.pre<IUsuario>("save", async function (next) {
  if (!this.isModified("senha")) return next();
  try {
    const salt = await bcrypt.genSalt(12);
    this.senha = await bcrypt.hash(this.senha, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

UsuarioSchema.methods.compararSenha = async function (
  senhaEnviada: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(senhaEnviada, this.senha);
  } catch {
    throw new Error("Erro ao comparar senhas");
  }
};

export const Usuario = model<IUsuario>("Usuario", UsuarioSchema);
