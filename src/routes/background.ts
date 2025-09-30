import express, { Request, Response } from "express";
import { Background } from "../models/Background";
import { AuthenticatedRequest, authenticateToken } from "../middleware/auth";

const router = express.Router();
router.use(authenticateToken);

router.get("/", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const background = await Background.find();
    res.json(background);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Erro ao buscar background", error: error.message });
  }
});

router.get("/:name", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const background = await Background.findOne({
      name: req.params.name,
    });
    if (!background) {
      return res.status(404).json({ message: "Background não encontrado" });
    }
    res.json(background);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Erro ao buscar background", error: error.message });
  }
});

router.post("/", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const newBackground = new Background(req.body);
    const savedBackground = await newBackground.save();
    res.status(201).json(savedBackground);
  } catch (error: any) {
    res
      .status(400)
      .json({ message: "Erro ao criar background", error: error.message });
  }
});

router.put("/:name", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const background = await Background.findOne({
      name: req.params.name,
    });

    if (!background) {
      return res.status(404).json({ message: "Background não encontrado" });
    }

    const updatedBackground = await Background.findOneAndUpdate(
      { name: req.params.name },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.json(updatedBackground);
  } catch (error: any) {
    res
      .status(400)
      .json({ message: "Erro ao atualizar background", error: error.message });
  }
});

router.delete("/:name", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const background = await Background.findOne({
      name: req.params.name,
    });

    if (!background) {
      return res.status(404).json({ message: "Background não encontrado" });
    }

    await Background.findOneAndDelete({ name: req.params.name });

    res.json({ message: "Background deletado com sucesso" });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Erro ao deletar background", error: error.message });
  }
});

export default router;
