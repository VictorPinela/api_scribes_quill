import express, { Request, Response } from "express";
import { User } from "../models/User";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password").populate("characters");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar usuários", error });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password")
      .populate("characters");
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar usuário", error });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.json(updatedUser);
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
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar usuário", error });
  }
});

export default router;
