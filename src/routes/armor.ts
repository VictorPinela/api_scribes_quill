import express, { Request, Response } from "express";
import { Armor } from "../models/Armor";
import { AuthenticatedRequest, authenticateToken } from "../middleware/auth";

const router = express.Router();
router.use(authenticateToken);

router.get("/", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const armor = await Armor.find().sort({ name: 1 });

    return res.status(200).json(armor);
  } catch (error: any) {
    return res.status(500).json({
      message: "Erro interno ao buscar armaduras",
      error: error.message,
    });
  }
});

router.get("/:name", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name } = req.params;

    const armor = await Armor.findOne({ name });
    if (!armor) {
      return res.status(404).json({ message: "Erro ao buscar armadura" });
    }

    return res.status(200).json(armor);
  } catch (error: any) {
    return res.status(500).json({
      message: "Erro interno ao buscar armadura",
      error: error.message,
    });
  }
});

router.post("/", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name, type } = req.body;

    if (!name || !type) {
      return res.status(400).json({
        message: "Nome e tipo são obrigatórios",
      });
    }

    const existingArmor = await Armor.findOne({ name });
    if (existingArmor) {
      return res.status(409).json({
        message: "Já existe armadura com este nome",
      });
    }

    const newArmor = new Armor(req.body);
    await newArmor.save();
    return res.status(201).json(newArmor);
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
        message: "Já existe armadura com este nome",
      });
    }

    return res.status(400).json({
      message: "Erro ao criar armadura",
      error: error.message,
    });
  }
});

router.put("/:name", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name } = req.params;

    const armor = await Armor.findOne({ name });
    if (!armor) {
      return res.status(404).json({ message: "Erro ao buscar armadura" });
    }

    if (req.body.name && req.body.name !== name) {
      const existingArmor = await Armor.findOne({ name: req.body.name });
      if (existingArmor) {
        return res.status(409).json({
          message: "Já existe armadura com este nome",
        });
      }
    }

    const updatedArmor = await armor.updateOne(req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json(updatedArmor);
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return res.status(400).json({
        message: "Dados inválidos para atualização",
        errors,
      });
    }

    return res.status(400).json({
      message: "Erro ao atualizar armadura",
      error: error.message,
    });
  }
});

router.delete("/:name", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name } = req.params;

    const armor = await Armor.findOne({ name });

    if (!armor) {
      return res.status(404).json({ message: "Erro ao buscar armadura" });
    }

    await armor.deleteOne();
    return res.status(200).json({ message: "Sucesso em deletar armadura" });
  } catch (error: any) {
    res.status(500).json({
      message: "Erro interno ao deletar armadura",
      error: error.message,
    });
  }
});

export default router;
