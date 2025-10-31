import express, { Request, Response } from "express";
import { Character } from "../models/Character";
import { AuthenticatedRequest, authenticateToken } from "../middleware/auth";

const router = express.Router();
router.use(authenticateToken);

router.get("/", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const character = await Character.find().sort({ name: 1 });

    return res.status(200).json(character);
  } catch (error: any) {
    return res.status(500).json({
      message: "Erro interno ao buscar personagems",
      error: error.message,
    });
  }
});

router.get("/:name", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name } = req.params;

    const character = await Character.findOne({ name });
    if (!character) {
      return res.status(404).json({ message: "Erro ao buscar personagem" });
    }

    return res.status(200).json(character);
  } catch (error: any) {
    return res.status(500).json({
      message: "Erro interno ao buscar personagem",
      error: error.message,
    });
  }
});

router.post("/", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Nome é obrigatório",
      });
    }

    const existingCharacter = await Character.findOne({ name });
    if (existingCharacter) {
      return res.status(409).json({
        message: "Já existe personagem com este nome",
      });
    }

    const newCharacter = new Character(req.body);
    await newCharacter.save();
    return res.status(201).json(newCharacter);
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return res.status(400).json({
        message: "Dados inválidos",
        errors,
      });
    }

    if (error.code === 11000) {
      return res.status(409).json({
        message: "Já existe personagem com este nome",
      });
    }

    return res.status(400).json({
      message: "Erro ao criar personagem",
      error: error.message,
    });
  }
});

router.put("/:name", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name } = req.params;

    const character = await Character.findOne({ name });
    if (!character) {
      return res.status(404).json({ message: "Erro ao buscar personagem" });
    }

    if (req.body.name && req.body.name !== name) {
      const existingCharacter = await Character.findOne({
        name: req.body.name,
      });
      if (existingCharacter) {
        return res.status(409).json({
          message: "Já existe personagem com este nome",
        });
      }
    }

    const updatedCharacter = await character.updateOne(req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json(updatedCharacter);
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return res.status(400).json({
        message: "Dados inválidos para atualização",
        errors,
      });
    }

    return res.status(400).json({
      message: "Erro ao atualizar personagem",
      error: error.message,
    });
  }
});

router.delete("/:name", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name } = req.params;

    const character = await Character.findOne({ name });

    if (!character) {
      return res.status(404).json({ message: "Erro ao buscar personagem" });
    }

    await character.deleteOne();
    return res.status(200).json({ message: "Sucesso em deletar personagem" });
  } catch (error: any) {
    res.status(500).json({
      message: "Erro interno ao deletar personagem",
      error: error.message,
    });
  }
});

export default router;
