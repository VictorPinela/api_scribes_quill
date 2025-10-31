import express, { Request, Response } from "express";
import { MagicItem } from "../models/MagicItem";
import { AuthenticatedRequest, authenticateToken } from "../middleware/auth";

const router = express.Router();
router.use(authenticateToken);

router.get("/", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const magicItem = await MagicItem.find().sort({ name: 1 });

    return res.status(200).json(magicItem);
  } catch (error: any) {
    return res.status(500).json({
      message: "Erro interno ao buscar itens magicos ",
      error: error.message,
    });
  }
});

router.get("/:name", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name } = req.params;

    const magicItem = await MagicItem.findOne({ name });
    if (!magicItem) {
      return res.status(404).json({ message: "Erro ao buscar item magico" });
    }

    return res.status(200).json(magicItem);
  } catch (error: any) {
    return res.status(500).json({
      message: "Erro interno ao buscar item magico",
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

    const existingMagicItem = await MagicItem.findOne({ name });
    if (existingMagicItem) {
      return res.status(409).json({
        message: "Já existe item magico com este nome",
      });
    }

    const newMagicItem = new MagicItem(req.body);
    await newMagicItem.save();
    return res.status(201).json(newMagicItem);
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
        message: "Já existe item magico com este nome",
      });
    }

    return res.status(400).json({
      message: "Erro ao criar item magico",
      error: error.message,
    });
  }
});

router.put("/:name", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name } = req.params;

    const magicItem = await MagicItem.findOne({ name });
    if (!magicItem) {
      return res.status(404).json({ message: "Erro ao buscar item magico" });
    }

    if (req.body.name && req.body.name !== name) {
      const existingMagicItem = await MagicItem.findOne({
        name: req.body.name,
      });
      if (existingMagicItem) {
        return res.status(409).json({
          message: "Já existe item magico com este nome",
        });
      }
    }

    const updatedMagicItem = await magicItem.updateOne(req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json(updatedMagicItem);
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return res.status(400).json({
        message: "Dados inválidos para atualização",
        errors,
      });
    }

    return res.status(400).json({
      message: "Erro ao atualizar item magico",
      error: error.message,
    });
  }
});

router.delete("/:name", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name } = req.params;

    const magicItem = await MagicItem.findOne({ name });

    if (!magicItem) {
      return res.status(404).json({ message: "Erro ao buscar item magico" });
    }

    await magicItem.deleteOne();
    return res.status(200).json({ message: "Sucesso em deletar item magico" });
  } catch (error: any) {
    res.status(500).json({
      message: "Erro interno ao deletar item magico",
      error: error.message,
    });
  }
});

export default router;
