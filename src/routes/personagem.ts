import express, { Request, Response } from "express";
import { Personagem } from "../models/Personagem";
import { Usuario } from "../models/Usuario";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const { usuarioId } = req.query;
    if (!usuarioId) {
      return res.status(400).json({ message: "usuarioId é obrigatório" });
    }
    const personagens = await Personagem.find({ usuarioId });
    res.json(personagens);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar personagens", error });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const personagem = await Personagem.findById(req.params.id);
    if (!personagem) {
      return res.status(404).json({ message: "Personagem não encontrado" });
    }
    res.json(personagem);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar personagem", error });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const novoPersonagem = new Personagem(req.body);
    const personagem = await novoPersonagem.save();
    res.status(201).json(personagem);
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar personagem", error });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { usuarioId } = req.body;
    const personagemId = req.params.id;

    const personagem = await Personagem.findById(personagemId);
    if (!personagem) {
      return res.status(404).json({ message: "Personagem não encontrado" });
    }
    if (personagem.usuarioId.toString() !== usuarioId) {
      return res.status(403).json({
        message: "Acesso negado. Personagem não pertence a este usuário",
      });
    }

    const personagemAtualizado = await Personagem.findByIdAndUpdate(
      personagemId,
      req.body,
      { new: true, runValidators: true }
    );
    res.json(personagemAtualizado);
  } catch (error) {
    res.status(400).json({ message: "Erro ao atualizar personagem", error });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { usuarioId } = req.body;
    const personagemId = req.params.id;

    const personagem = await Personagem.findById(personagemId);
    if (!personagem) {
      return res.status(404).json({ message: "Personagem não encontrado" });
    }
    if (personagem.usuarioId.toString() !== usuarioId) {
      return res.status(403).json({
        message: "Acesso negado. Personagem não pertence a este usuário",
      });
    }

    await Personagem.findByIdAndDelete(personagemId);

    res.json({ message: "Personagem deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar personagem", error });
  }
});

export default router;
