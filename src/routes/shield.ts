import express, { Request, Response } from "express";
import { Shield } from "../models/Shield";
import { AuthenticatedRequest, authenticateToken } from "../middleware/auth";

const router = express.Router();
router.use(authenticateToken);

router.get("/", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const shield = await Shield.find().sort({ name: 1 });

    return res.status(200).json(shield);
  } catch (error: any) {
    return res.status(500).json({
      message: "Erro interno ao buscar escudos",
      error: error.message,
    });
  }
});

router.get("/:name", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name } = req.params;

    const shield = await Shield.findOne({ name });
    if (!shield) {
      return res.status(404).json({ message: "Erro ao buscar escudo" });
    }

    return res.status(200).json(shield);
  } catch (error: any) {
    return res.status(500).json({
      message: "Erro interno ao buscar escudo",
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

    const existingShield = await Shield.findOne({ name });
    if (existingShield) {
      return res.status(409).json({
        message: "Já existe escudo com este nome",
      });
    }

    const newShield = new Shield(req.body);
    await newShield.save();
    return res.status(201).json(newShield);
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
        message: "Já existe escudo com este nome",
      });
    }

    return res.status(400).json({
      message: "Erro ao criar escudo",
      error: error.message,
    });
  }
});

router.put("/:name", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name } = req.params;

    const shield = await Shield.findOne({ name });
    if (!shield) {
      return res.status(404).json({ message: "Erro ao buscar escudo" });
    }

    if (req.body.name && req.body.name !== name) {
      const existingShield = await Shield.findOne({ name: req.body.name });
      if (existingShield) {
        return res.status(409).json({
          message: "Já existe escudo com este nome",
        });
      }
    }

    const updatedShield = await shield.updateOne(req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json(updatedShield);
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return res.status(400).json({
        message: "Dados inválidos para atualização",
        errors,
      });
    }

    return res.status(400).json({
      message: "Erro ao atualizar escudo",
      error: error.message,
    });
  }
});

router.delete("/:name", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name } = req.params;

    const shield = await Shield.findOne({ name });

    if (!shield) {
      return res.status(404).json({ message: "Erro ao buscar escudo" });
    }

    await shield.deleteOne();
    return res.status(200).json({ message: "Sucesso em deletar escudo" });
  } catch (error: any) {
    res.status(500).json({
      message: "Erro interno ao deletar escudo",
      error: error.message,
    });
  }
});

export default router;
