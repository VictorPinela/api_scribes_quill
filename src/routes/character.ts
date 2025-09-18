import express, { Request, Response } from "express";
import { Character } from "../models/Character";
import { AuthenticatedRequest, authenticateToken } from "../middleware/auth";

const router = express.Router();
router.use(authenticateToken);

router.get("/", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const characters = await Character.find({ userId: req.user?.userId });
    res.json(characters);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Erro ao buscar personagens", error: error.message });
  }
});

router.get("/:id", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const character = await Character.findOne({
      _id: req.params.id,
      userId: req.user?.userId,
    });
    if (!character) {
      return res.status(404).json({ message: "Personagem não encontrado" });
    }
    res.json(character);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Erro ao buscar personagem", error: error.message });
  }
});

router.post("/", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const newCharacter = new Character({
      ...req.body,
      userId: req.user?.userId,
    });
    const savedCharacter = await newCharacter.save();
    res.status(201).json(savedCharacter);
  } catch (error: any) {
    res
      .status(400)
      .json({ message: "Erro ao criar personagem", error: error.message });
  }
});

router.put("/:id", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const character = await Character.findOne({
      _id: req.params.id,
      userId: req.user?.userId,
    });

    if (!character) {
      return res.status(404).json({ message: "Personagem não encontrado" });
    }

    if (req.body.hp) {
      if (req.body.hp.current == undefined)
        req.body.hp.current = character.hp.current;
      if (req.body.hp.max == undefined) req.body.hp.max = character.hp.max;
      if (req.body.hp.temporary == undefined)
        req.body.hp.temporary = character.hp.temporary;
    }

    const updatedCharacter = await Character.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedCharacter);
  } catch (error: any) {
    res
      .status(400)
      .json({ message: "Erro ao atualizar personagem", error: error.message });
  }
});

router.delete("/:id", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const character = await Character.findOne({
      _id: req.params.id,
      userId: req.user?.userId,
    });

    if (!character) {
      return res.status(404).json({ message: "Personagem não encontrado" });
    }

    await Character.findByIdAndDelete(req.params.id);

    res.json({ message: "Personagem deletado com sucesso" });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Erro ao deletar personagem", error: error.message });
  }
});

export default router;
