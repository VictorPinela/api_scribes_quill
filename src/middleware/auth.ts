import { Request, Response, NextFunction } from "express";
import { verifyToken, JwtPayload } from "../utils/auth";
import { BlacklistedToken } from "../models/BlacklistedToken";
import { User } from "../models/User";

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Token de acesso necessário" });
      return;
    }

    const isBlacklisted = await BlacklistedToken.findOne({ token });
    if (isBlacklisted) {
      res.status(401).json({ message: "Token inválido (logout realizado)" });
      return;
    }

    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error: any) {
    res.status(403).json({ message: error.message || "Token inválido" });
  }
};
