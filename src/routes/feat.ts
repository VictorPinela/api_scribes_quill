import express, { Request, Response } from "express";
import { Feat } from "../models/Feat";
import { AuthenticatedRequest, authenticateToken } from "../middleware/auth";

const router = express.Router();
router.use(authenticateToken);

router.get("/", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const feat = await Feat.find().sort({ name: 1 });
    res.json(feat);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Erro ao buscar talento", error: error.message });
  }
});

router.get("/:name", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const feat = await Feat.findOne({
      name: req.params.name,
    });
    if (!feat) {
      return res.status(404).json({ message: "Talento não encontrado" });
    }
    res.json(feat);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Erro ao buscar talento", error: error.message });
  }
});

router.post("/", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const newFeat = new Feat(req.body);
    const savedFeat = await newFeat.save();
    res.status(201).json(savedFeat);
  } catch (error: any) {
    res
      .status(400)
      .json({ message: "Erro ao criar talento", error: error.message });
  }
});

router.put("/:name", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const feat = await Feat.findOne({
      name: req.params.name,
    });

    if (!feat) {
      return res.status(404).json({ message: "Talento não encontrado" });
    }

    const updatedFeat = await Feat.findOneAndUpdate(
      { name: req.params.name },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.json(updatedFeat);
  } catch (error: any) {
    res
      .status(400)
      .json({ message: "Erro ao atualizar talento", error: error.message });
  }
});

router.delete("/:name", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const feat = await Feat.findOne({
      name: req.params.name,
    });

    if (!feat) {
      return res.status(404).json({ message: "Talento não encontrado" });
    }

    await Feat.findOneAndDelete({ name: req.params.name });

    res.json({ message: "Talento deletado com sucesso" });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Erro ao deletar talento", error: error.message });
  }
});

export default router;
