import express, { Request, Response } from "express";
import { Class } from "../models/Class";
import { AuthenticatedRequest, authenticateToken } from "../middleware/auth";

const router = express.Router();
router.use(authenticateToken);

router.get("/", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const dndClass = await Class.find();
    res.json(dndClass);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Erro ao buscar classe", error: error.message });
  }
});

router.get("/:name", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const dndClass = await Class.findOne({
      name: req.params.name,
    });
    if (!dndClass) {
      return res.status(404).json({ message: "Classe não encontrada" });
    }
    res.json(dndClass);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Erro ao buscar classe", error: error.message });
  }
});

router.post("/", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const newClass = new Class(req.body);
    const savedClass = await newClass.save();
    res.status(201).json(savedClass);
  } catch (error: any) {
    res
      .status(400)
      .json({ message: "Erro ao criar Classe", error: error.message });
  }
});

router.put("/:name", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const dndClass = await Class.findOne({
      name: req.params.name,
    });

    if (!dndClass) {
      return res.status(404).json({ message: "Classe não encontrada" });
    }

    const updatedClass = await Class.findOneAndUpdate(
      { name: req.params.name },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.json(updatedClass);
  } catch (error: any) {
    res
      .status(400)
      .json({ message: "Erro ao atualizar classe", error: error.message });
  }
});

router.delete("/:name", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const dndClass = await Class.findOne({
      name: req.params.name,
    });

    if (!dndClass) {
      return res.status(404).json({ message: "Classe não encontrada" });
    }

    await Class.findOneAndDelete({ name: req.params.name });

    res.json({ message: "Classe deletada com sucesso" });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Erro ao deletar classe", error: error.message });
  }
});

export default router;
