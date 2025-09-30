import express, { Request, Response } from "express";
import { Specie } from "../models/Specie";
import { AuthenticatedRequest, authenticateToken } from "../middleware/auth";

const router = express.Router();
router.use(authenticateToken);

router.get("/", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const specie = await Specie.find();
    res.json(specie);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Erro ao buscar especie", error: error.message });
  }
});

router.get("/:name", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const specie = await Specie.findOne({
      name: req.params.name,
    });
    if (!specie) {
      return res.status(404).json({ message: "Especie não encontrada" });
    }
    res.json(specie);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Erro ao buscar especie", error: error.message });
  }
});

router.post("/", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const newSpecie = new Specie(req.body);
    const savedSpecie = await newSpecie.save();
    res.status(201).json(savedSpecie);
  } catch (error: any) {
    res
      .status(400)
      .json({ message: "Erro ao criar especie", error: error.message });
  }
});

router.put("/:name", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const specie = await Specie.findOne({
      name: req.params.name,
    });

    if (!specie) {
      return res.status(404).json({ message: "Especie não encontrada" });
    }

    const updatedSpecie = await Specie.findOneAndUpdate(
      { name: req.params.name },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.json(updatedSpecie);
  } catch (error: any) {
    res
      .status(400)
      .json({ message: "Erro ao atualizar especie", error: error.message });
  }
});

router.delete("/:name", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const specie = await Specie.findOne({
      name: req.params.name,
    });

    if (!specie) {
      return res.status(404).json({ message: "Especie não encontrada" });
    }

    await Specie.findOneAndDelete({ name: req.params.name });

    res.json({ message: "Especie deletada com sucesso" });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Erro ao deletar especie", error: error.message });
  }
});

export default router;
