import jwt from "jsonwebtoken";
import ms from "ms";
import { IUser } from "../types";

export interface JwtPayload {
  userId: string;
  email: string;
}

export const generateToken = (user: IUser): string => {
  const id = user._id?.toString();
  if (id === undefined) throw new Error("userId Invalido");
  const payload: JwtPayload = {
    userId: id,
    email: user.email,
  };

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET não está configurado");
  }
  const expiresIn = process.env.JWT_EXPIRES_IN || "7d";
  const options: jwt.SignOptions = {};

  if (expiresIn) {
    if (!isNaN(Number(expiresIn))) {
      options.expiresIn = Number(expiresIn);
    } else {
      options.expiresIn = expiresIn as ms.StringValue;
    }
  } else {
    options.expiresIn = "7d"; // Valor padrão
  }

  return jwt.sign(payload, secret, options);
};

export const verifyToken = (token: string): JwtPayload => {
  try {
    const secret = process.env.JWT_SECRET || "fallback_secret";
    const decoded = jwt.verify(token, secret) as JwtPayload;
    return decoded;
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error("Token inválido");
    } else if (error instanceof jwt.TokenExpiredError) {
      throw new Error("Token expirado");
    }
    throw new Error("Erro ao verificar token");
  }
};
