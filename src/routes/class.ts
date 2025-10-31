import express, { Request, Response } from "express";
import { Class } from "../models/Class";
import { AuthenticatedRequest, authenticateToken } from "../middleware/auth";

const router = express.Router();
router.use(authenticateToken);

router.get("/", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const dndClass = await Class.find().sort({ name: 1 });

    return res.status(200).json(dndClass);
  } catch (error: any) {
    return res.status(500).json({
      message: "Erro interno ao buscar classes",
      error: error.message,
    });
  }
});

router.get("/:name", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name } = req.params;

    const dndClass = await Class.findOne({ name });
    if (!dndClass) {
      return res.status(404).json({ message: "Erro ao buscar classe" });
    }

    return res.status(200).json(dndClass);
  } catch (error: any) {
    return res.status(500).json({
      message: "Erro interno ao buscar classe",
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

    const existingClass = await Class.findOne({ name });
    if (existingClass) {
      return res.status(409).json({
        message: "Já existe classe com este nome",
      });
    }

    const newClass = new Class(req.body);
    await newClass.save();
    return res.status(201).json(newClass);
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
        message: "Já existe classe com este nome",
      });
    }

    return res.status(400).json({
      message: "Erro ao criar classe",
      error: error.message,
    });
  }
});

router.put("/:name", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name } = req.params;

    const dndClass = await Class.findOne({ name });
    if (!dndClass) {
      return res.status(404).json({ message: "Erro ao buscar classe" });
    }

    if (req.body.name && req.body.name !== name) {
      const existingClass = await Class.findOne({ name: req.body.name });
      if (existingClass) {
        return res.status(409).json({
          message: "Já existe classe com este nome",
        });
      }
    }

    const updatedClass = await dndClass.updateOne(req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json(updatedClass);
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return res.status(400).json({
        message: "Dados inválidos para atualização",
        errors,
      });
    }

    return res.status(400).json({
      message: "Erro ao atualizar classe",
      error: error.message,
    });
  }
});

router.delete("/:name", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name } = req.params;

    const dndClass = await Class.findOne({ name });

    if (!dndClass) {
      return res.status(404).json({ message: "Erro ao buscar classe" });
    }

    await dndClass.deleteOne();
    return res.status(200).json({ message: "Sucesso em deletar classe" });
  } catch (error: any) {
    res.status(500).json({
      message: "Erro interno ao deletar classe",
      error: error.message,
    });
  }
});

export default router;
