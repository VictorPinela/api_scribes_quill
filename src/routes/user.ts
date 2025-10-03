import express, { Request, Response } from "express";
import { User } from "../models/User";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await User.find()
      .select("-password")
      .select("-isVerified")
      .populate("characters");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar usuários", error });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password")
      .select("-isVerified")
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
    const { name, email, role } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role },
      { new: true, runValidators: true }
    )
      .select("-password")
      .select("-isVerified");

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

router.put("/change-password/:id", async (req: Request, res: Response) => {
  try {
    const { newPassword, oldPassword } = req.body;

    if (!oldPassword || !newPassword)
      return res.status(400).json({ message: "Dados inválidos" });

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const isPasswordValid = await user.comparePassword(oldPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Senha inválida" });
    }

    user.password = newPassword;
    const savedUser = await user.save();

    res.json(savedUser);
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
