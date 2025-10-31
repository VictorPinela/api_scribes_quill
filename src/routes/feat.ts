import express, { Request, Response } from "express";
import { Feat } from "../models/Feat";
import { AuthenticatedRequest, authenticateToken } from "../middleware/auth";

const router = express.Router();
router.use(authenticateToken);

router.get("/", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const feat = await Feat.find().sort({ name: 1 });

    return res.status(200).json(feat);
  } catch (error: any) {
    return res.status(500).json({
      message: "Erro interno ao buscar talentos",
      error: error.message,
    });
  }
});

router.get("/:name", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name } = req.params;

    const feat = await Feat.findOne({ name });
    if (!feat) {
      return res.status(404).json({ message: "Erro ao buscar talento" });
    }

    return res.status(200).json(feat);
  } catch (error: any) {
    return res.status(500).json({
      message: "Erro interno ao buscar talento",
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

    const existingFeat = await Feat.findOne({ name });
    if (existingFeat) {
      return res.status(409).json({
        message: "Já existe talento com este nome",
      });
    }

    const newFeat = new Feat(req.body);
    await newFeat.save();
    return res.status(201).json(newFeat);
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
        message: "Já existe talento com este nome",
      });
    }

    return res.status(400).json({
      message: "Erro ao criar talento",
      error: error.message,
    });
  }
});

router.put("/:name", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name } = req.params;

    const feat = await Feat.findOne({ name });
    if (!feat) {
      return res.status(404).json({ message: "Erro ao buscar talento" });
    }

    if (req.body.name && req.body.name !== name) {
      const existingFeat = await Feat.findOne({ name: req.body.name });
      if (existingFeat) {
        return res.status(409).json({
          message: "Já existe talento com este nome",
        });
      }
    }

    const updatedFeat = await feat.updateOne(req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json(updatedFeat);
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return res.status(400).json({
        message: "Dados inválidos para atualização",
        errors,
      });
    }

    return res.status(400).json({
      message: "Erro ao atualizar talento",
      error: error.message,
    });
  }
});

router.delete("/:name", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name } = req.params;

    const feat = await Feat.findOne({ name });

    if (!feat) {
      return res.status(404).json({ message: "Erro ao buscar talento" });
    }

    await feat.deleteOne();
    return res.status(200).json({ message: "Sucesso em deletar talento" });
  } catch (error: any) {
    res.status(500).json({
      message: "Erro interno ao deletar talento",
      error: error.message,
    });
  }
});

export default router;
