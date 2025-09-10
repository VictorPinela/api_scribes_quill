import express, { Request, Response } from "express";
import { Usuario } from "../models/Usuario";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const usuario = await Usuario.find().select("-senha");
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar usuários", error });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const usuario = await Usuario.findById(req.params.id)
      .select("-senha")
      .populate("personagens");
    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar usuário", error });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const { nome, email, senha } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({ message: "Email já cadastrado" });
    }

    const novoUsuario = new Usuario({ nome, email, senha });
    const usuarioSalvo = await novoUsuario.save();

    // Retorna o usuário sem a senha
    const userResponse = {
      _id: usuarioSalvo._id,
      nome: usuarioSalvo.nome,
      email: usuarioSalvo.email,
    };

    res.status(201).json(userResponse);
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return res.status(400).json({ message: "Dados inválidos", errors });
    }
    res
      .status(500)
      .json({ message: "Erro ao criar usuário", error: error.message });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { nome, email } = req.body;

    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      { nome, email },
      { new: true, runValidators: true }
    ).select("-senha");

    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.json(usuario);
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return res.status(400).json({ message: "Dados inválidos", errors });
    }
    res
      .status(500)
      .json({ message: "Erro ao atualizar usuário", error: error.message });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);

    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar usuário", error });
  }
});

export default router;
