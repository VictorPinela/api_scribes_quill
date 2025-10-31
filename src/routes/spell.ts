import express, { Request, Response } from "express";
import { Spell } from "../models/Spell";
import { AuthenticatedRequest, authenticateToken } from "../middleware/auth";

const router = express.Router();
router.use(authenticateToken);

router.get("/", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const spell = await Spell.find().sort({ name: 1 });

    return res.status(200).json(spell);
  } catch (error: any) {
    return res.status(500).json({
      message: "Erro interno ao buscar magias",
      error: error.message,
    });
  }
});

router.get("/:name", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name } = req.params;

    const spell = await Spell.findOne({ name });
    if (!spell) {
      return res.status(404).json({ message: "Erro ao buscar magia" });
    }

    return res.status(200).json(spell);
  } catch (error: any) {
    return res.status(500).json({
      message: "Erro interno ao buscar magia",
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

    const existingSpell = await Spell.findOne({ name });
    if (existingSpell) {
      return res.status(409).json({
        message: "Já existe magia com este nome",
      });
    }

    const newSpell = new Spell(req.body);
    await newSpell.save();
    return res.status(201).json(newSpell);
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
        message: "Já existe magia com este nome",
      });
    }

    return res.status(400).json({
      message: "Erro ao criar magia",
      error: error.message,
    });
  }
});

router.put("/:name", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name } = req.params;

    const spell = await Spell.findOne({ name });
    if (!spell) {
      return res.status(404).json({ message: "Erro ao buscar magia" });
    }

    if (req.body.name && req.body.name !== name) {
      const existingSpell = await Spell.findOne({ name: req.body.name });
      if (existingSpell) {
        return res.status(409).json({
          message: "Já existe magia com este nome",
        });
      }
    }

    const updatedSpell = await spell.updateOne(req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json(updatedSpell);
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return res.status(400).json({
        message: "Dados inválidos para atualização",
        errors,
      });
    }

    return res.status(400).json({
      message: "Erro ao atualizar magia",
      error: error.message,
    });
  }
});

router.delete("/:name", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name } = req.params;

    const spell = await Spell.findOne({ name });

    if (!spell) {
      return res.status(404).json({ message: "Erro ao buscar magia" });
    }

    await spell.deleteOne();
    return res.status(200).json({ message: "Sucesso em deletar magia" });
  } catch (error: any) {
    res.status(500).json({
      message: "Erro interno ao deletar magia",
      error: error.message,
    });
  }
});

export default router;
