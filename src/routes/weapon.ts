import express, { Request, Response } from "express";
import { Weapon } from "../models/Weapon";
import { AuthenticatedRequest, authenticateToken } from "../middleware/auth";

const router = express.Router();
router.use(authenticateToken);

router.get("/", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const weapon = await Weapon.find().sort({ name: 1 });

    return res.status(200).json(weapon);
  } catch (error: any) {
    return res.status(500).json({
      message: "Erro interno ao buscar armas",
      error: error.message,
    });
  }
});

router.get("/:name", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name } = req.params;

    const weapon = await Weapon.findOne({ name });
    if (!weapon) {
      return res.status(404).json({ message: "Erro ao buscar arma" });
    }

    return res.status(200).json(weapon);
  } catch (error: any) {
    return res.status(500).json({
      message: "Erro interno ao buscar arma",
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

    const existingWeapon = await Weapon.findOne({ name });
    if (existingWeapon) {
      return res.status(409).json({
        message: "Já existe arma com este nome",
      });
    }

    const newWeapon = new Weapon(req.body);
    await newWeapon.save();
    return res.status(201).json(newWeapon);
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
        message: "Já existe arma com este nome",
      });
    }

    return res.status(400).json({
      message: "Erro ao criar arma",
      error: error.message,
    });
  }
});

router.put("/:name", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name } = req.params;

    const weapon = await Weapon.findOne({ name });
    if (!weapon) {
      return res.status(404).json({ message: "Erro ao buscar arma" });
    }

    if (req.body.name && req.body.name !== name) {
      const existingWeapon = await Weapon.findOne({ name: req.body.name });
      if (existingWeapon) {
        return res.status(409).json({
          message: "Já existe arma com este nome",
        });
      }
    }

    const updatedWeapon = await weapon.updateOne(req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json(updatedWeapon);
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return res.status(400).json({
        message: "Dados inválidos para atualização",
        errors,
      });
    }

    return res.status(400).json({
      message: "Erro ao atualizar arma",
      error: error.message,
    });
  }
});

router.delete("/:name", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name } = req.params;

    const weapon = await Weapon.findOne({ name });

    if (!weapon) {
      return res.status(404).json({ message: "Erro ao buscar arma" });
    }

    await weapon.deleteOne();
    return res.status(200).json({ message: "Sucesso em deletar arma" });
  } catch (error: any) {
    res.status(500).json({
      message: "Erro interno ao deletar arma",
      error: error.message,
    });
  }
});

export default router;
