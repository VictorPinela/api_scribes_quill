import express, { Request, Response } from "express";
import { Tool } from "../models/Tool";
import { AuthenticatedRequest, authenticateToken } from "../middleware/auth";

const router = express.Router();
router.use(authenticateToken);

router.get("/", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const tool = await Tool.find().sort({ name: 1 });

    return res.status(200).json(tool);
  } catch (error: any) {
    return res.status(500).json({
      message: "Erro interno ao buscar ferramentas",
      error: error.message,
    });
  }
});

router.get("/:name", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name } = req.params;

    const tool = await Tool.findOne({ name });
    if (!tool) {
      return res.status(404).json({ message: "Erro ao buscar ferramenta" });
    }

    return res.status(200).json(tool);
  } catch (error: any) {
    return res.status(500).json({
      message: "Erro interno ao buscar ferramenta",
      error: error.message,
    });
  }
});

router.post("/", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name, ability, ...rest } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Nome é obrigatório",
      });
    }

    const existingTool = await Tool.findOne({ name });
    if (existingTool) {
      return res.status(409).json({
        message: "Já existe ferramenta com este nome",
      });
    }

    const correctedAbility =
      ability === "inteligência" ? "inteligencia" : ability;

    const newTool = new Tool({
      name,
      ability: correctedAbility,
      ...rest,
    });
    await newTool.save();
    return res.status(201).json(newTool);
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
        message: "Já existe ferramenta com este nome",
      });
    }

    return res.status(400).json({
      message: "Erro ao criar ferramenta",
      error: error.message,
    });
  }
});

router.put("/:name", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name } = req.params;

    const tool = await Tool.findOne({ name });
    if (!tool) {
      return res.status(404).json({ message: "Erro ao buscar ferramenta" });
    }

    if (req.body.name && req.body.name !== name) {
      const existingTool = await Tool.findOne({ name: req.body.name });
      if (existingTool) {
        return res.status(409).json({
          message: "Já existe ferramenta com este nome",
        });
      }
    }

    const updatedTool = await tool.updateOne(req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json(updatedTool);
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return res.status(400).json({
        message: "Dados inválidos para atualização",
        errors,
      });
    }

    return res.status(400).json({
      message: "Erro ao atualizar ferramenta",
      error: error.message,
    });
  }
});

router.delete("/:name", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name } = req.params;

    const tool = await Tool.findOne({ name });

    if (!tool) {
      return res.status(404).json({ message: "Erro ao buscar ferramenta" });
    }

    await tool.deleteOne();
    return res.status(200).json({ message: "Sucesso em deletar ferramenta" });
  } catch (error: any) {
    res.status(500).json({
      message: "Erro interno ao deletar ferramenta",
      error: error.message,
    });
  }
});

export default router;
