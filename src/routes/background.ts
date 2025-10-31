import express, { Request, Response } from "express";
import { Background } from "../models/Background";
import { AuthenticatedRequest, authenticateToken } from "../middleware/auth";

const router = express.Router();
router.use(authenticateToken);

router.get("/", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const background = await Background.find().sort({ name: 1 });

    return res.status(200).json(background);
  } catch (error: any) {
    return res.status(500).json({
      message: "Erro interno ao buscar backgrounds",
      error: error.message,
    });
  }
});

router.get("/:name", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name } = req.params;

    const background = await Background.findOne({ name });
    if (!background) {
      return res.status(404).json({ message: "Erro ao buscar background" });
    }

    return res.status(200).json(background);
  } catch (error: any) {
    return res.status(500).json({
      message: "Erro interno ao buscar background",
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

    const existingBackground = await Background.findOne({ name });
    if (existingBackground) {
      return res.status(409).json({
        message: "Já existe background com este nome",
      });
    }

    const newBackground = new Background(req.body);
    await newBackground.save();
    return res.status(201).json(newBackground);
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
        message: "Já existe background com este nome",
      });
    }

    return res.status(400).json({
      message: "Erro ao criar background",
      error: error.message,
    });
  }
});

router.put("/:name", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name } = req.params;

    const background = await Background.findOne({ name });
    if (!background) {
      return res.status(404).json({ message: "Erro ao buscar background" });
    }

    if (req.body.name && req.body.name !== name) {
      const existingBackground = await Background.findOne({
        name: req.body.name,
      });
      if (existingBackground) {
        return res.status(409).json({
          message: "Já existe background com este nome",
        });
      }
    }

    const updatedBackground = await background.updateOne(req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json(updatedBackground);
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return res.status(400).json({
        message: "Dados inválidos para atualização",
        errors,
      });
    }

    return res.status(400).json({
      message: "Erro ao atualizar background",
      error: error.message,
    });
  }
});

router.delete("/:name", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name } = req.params;

    const background = await Background.findOne({ name });

    if (!background) {
      return res.status(404).json({ message: "Erro ao buscar background" });
    }

    await background.deleteOne();
    return res.status(200).json({ message: "Sucesso em deletar background" });
  } catch (error: any) {
    res.status(500).json({
      message: "Erro interno ao deletar background",
      error: error.message,
    });
  }
});

export default router;
