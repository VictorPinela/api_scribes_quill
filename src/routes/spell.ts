import express, { Request, Response } from "express";
import { Spell } from "../models/Spell";
import { AuthenticatedRequest, authenticateToken } from "../middleware/auth";

const router = express.Router();
router.use(authenticateToken);

router.get("/", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const spell = await Spell.find().sort({ name: 1 });
    res.json(spell);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Erro ao buscar magia", error: error.message });
  }
});

router.get("/:name", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const spell = await Spell.findOne({
      name: req.params.name,
    });
    if (!spell) {
      return res.status(404).json({ message: "Magia não encontrada" });
    }
    res.json(spell);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Erro ao buscar magia", error: error.message });
  }
});

router.post("/", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const newSpell = new Spell(req.body);
    const savedSpell = await newSpell.save();
    res.status(201).json(savedSpell);
  } catch (error: any) {
    res
      .status(400)
      .json({ message: "Erro ao criar magia", error: error.message });
  }
});

router.put("/:name", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const spell = await Spell.findOne({
      name: req.params.name,
    });

    if (!spell) {
      return res.status(404).json({ message: "Magia não encontrada" });
    }

    const updatedSpell = await Spell.findOneAndUpdate(
      { name: req.params.name },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.json(updatedSpell);
  } catch (error: any) {
    res
      .status(400)
      .json({ message: "Erro ao atualizar magia", error: error.message });
  }
});

router.delete("/:name", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const spell = await Spell.findOne({
      name: req.params.name,
    });

    if (!spell) {
      return res.status(404).json({ message: "Magia não encontrada" });
    }

    await Spell.findOneAndDelete({ name: req.params.name });

    res.json({ message: "Magia deletado com sucesso" });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Erro ao deletar magia", error: error.message });
  }
});

export default router;
