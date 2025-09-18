import express, { Request, Response } from "express";
import { User } from "../models/User";
import { generateToken, verifyToken } from "../utils/auth";
import { BlacklistedToken } from "../models/BlacklistedToken";
import { AuthenticatedRequest } from "../middleware/auth";

const router = express.Router();

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email e senha são obrigatórios" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email inválido" });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Senha inválida" });
    }

    const token = generateToken(user);

    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };

    res.status(200).json({
      message: "Login realizado com sucesso",
      user: userResponse,
      token,
    });
  } catch (error: any) {
    res.status(500).json({ message: "Erro no login", error: error.message });
  }
});

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email já cadastrado" });
    }

    const newUser = new User({ name, email, password });
    const savedUser = await newUser.save();

    const userResponse = {
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      createdAt: savedUser.createdAt,
    };

    res.status(201).json({
      message: "Usuário criado com sucesso",
      user: userResponse,
    });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return res.status(400).json({ message: "Dados inválidos", errors });
    }
    res
      .status(500)
      .json({ message: "Erro ao criar usuário", error: error.message });
  }
});

router.post("/logout", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(400).json({ message: "Token não fornecido" });
    }

    const decoded = verifyToken(token) as any;

    const expiresAt = new Date(decoded.exp * 1000);

    const blacklistedToken = new BlacklistedToken({
      token,
      expiresAt,
      userId: decoded.userId,
    });

    await blacklistedToken.save();

    res.json({ message: "Logout realizado com sucesso" });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Erro ao fazer logout", error: error.message });
  }
});

export default router;
