import express, { Request, Response } from "express";
import { Specie } from "../models/Specie";
import { AuthenticatedRequest, authenticateToken } from "../middleware/auth";

const router = express.Router();
router.use(authenticateToken);

router.get("/", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const specie = await Specie.find().sort({ name: 1 });

    return res.status(200).json(specie);
  } catch (error: any) {
    return res.status(500).json({
      message: "Erro interno ao buscar especies",
      error: error.message,
    });
  }
});

router.get("/:name", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name } = req.params;

    const specie = await Specie.findOne({ name });
    if (!specie) {
      return res.status(404).json({ message: "Erro ao buscar especie" });
    }

    return res.status(200).json(specie);
  } catch (error: any) {
    return res.status(500).json({
      message: "Erro interno ao buscar especie",
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
    const existingSpecie = await Specie.findOne({ name });
    if (existingSpecie) {
      return res.status(409).json({
        message: "Já existe especie com este nome",
      });
    }

    const newSpecie = new Specie(req.body);
    await newSpecie.save();
    return res.status(201).json(newSpecie);
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
        message: "Já existe especie com este nome",
      });
    }

    return res.status(400).json({
      message: "Erro ao criar especie",
      error: error.message,
    });
  }
});

router.put("/:name", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name } = req.params;

    const specie = await Specie.findOne({ name });
    if (!specie) {
      return res.status(404).json({ message: "Erro ao buscar especie" });
    }

    if (req.body.name && req.body.name !== name) {
      const existingSpecie = await Specie.findOne({ name: req.body.name });
      if (existingSpecie) {
        return res.status(409).json({
          message: "Já existe especie com este nome",
        });
      }
    }

    const updatedSpecie = await specie.updateOne(req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json(updatedSpecie);
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return res.status(400).json({
        message: "Dados inválidos para atualização",
        errors,
      });
    }

    return res.status(400).json({
      message: "Erro ao atualizar especie",
      error: error.message,
    });
  }
});

router.delete("/:name", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name } = req.params;

    const specie = await Specie.findOne({ name });

    if (!specie) {
      return res.status(404).json({ message: "Erro ao buscar especie" });
    }

    await specie.deleteOne();
    return res.status(200).json({ message: "Sucesso em deletar especie" });
  } catch (error: any) {
    res.status(500).json({
      message: "Erro interno ao deletar especie",
      error: error.message,
    });
  }
});

export default router;
