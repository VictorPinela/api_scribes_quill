import express, { Request, Response } from "express";
import { Item } from "../models/Item";
import { AuthenticatedRequest, authenticateToken } from "../middleware/auth";

const router = express.Router();
router.use(authenticateToken);

router.get("/", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const item = await Item.find().sort({ name: 1 });
    res.json(item);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Erro ao buscar item", error: error.message });
  }
});

router.get("/:name", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const item = await Item.findOne({
      name: req.params.name,
    });
    if (!item) {
      return res.status(404).json({ message: "Item não encontrado" });
    }
    res.json(item);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Erro ao buscar item", error: error.message });
  }
});

router.post("/", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error: any) {
    res
      .status(400)
      .json({ message: "Erro ao criar item", error: error.message });
  }
});

router.put("/:name", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const item = await Item.findOne({
      name: req.params.name,
    });

    if (!item) {
      return res.status(404).json({ message: "Item não encontrada" });
    }

    const updatedItem = await Item.findOneAndUpdate(
      { name: req.params.name },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.json(updatedItem);
  } catch (error: any) {
    res
      .status(400)
      .json({ message: "Erro ao atualizar item", error: error.message });
  }
});

router.delete("/:name", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const item = await Item.findOne({
      name: req.params.name,
    });

    if (!item) {
      return res.status(404).json({ message: "Item não encontrada" });
    }

    await Item.findOneAndDelete({ name: req.params.name });

    res.json({ message: "Item deletada com sucesso" });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Erro ao deletar item", error: error.message });
  }
});

export default router;
