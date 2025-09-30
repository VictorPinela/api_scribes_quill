import express, { Request, Response } from "express";
import { Character } from "../models/Character";
import { AuthenticatedRequest, authenticateToken } from "../middleware/auth";
import { QueryOptions } from "mongoose";

const router = express.Router();
router.use(authenticateToken);

router.get("/", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const characters = await Character.find({
      userId: req.user?.userId,
    })
      .populate("class")
      .populate("specie")
      .populate("background")
      .populate("spells.spells")
      .populate("userId");
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

    const body = dataVerification(character.toObject(), req.body);

    const updatedCharacter = await Character.findByIdAndUpdate(
      req.params.id,
      body,
      {
        new: true,
        runValidators: true,
      }
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

function dataVerification(character: any, body: Request["body"]) {
  console.log("entrou dataVerification");
  if (body.hp) {
    console.log("possui body.hp");
    body.hp = {
      ...character.hp,
      ...body.hp,
    };
  }
  if (body.stats) {
    console.log("possui body.stats");
    body.stats = {
      ...character.stats,
      ...body.stats,
    };
  }
  if (body.proficiencies) {
    console.log("possui body.proficiencies");
    body.proficiencies = {
      ...character.proficiencies,
      ...body.proficiencies,
    };
  }
  if (body.features) {
    console.log("possui body.features");
    body.features = {
      ...character.features,
      ...body.features,
    };
  }
  if (body.equipment) {
    console.log("possui body.equipment");
    if (body.equipment.items) {
      console.log("possui body.equipment.items");
      body.equipment.items = {
        ...character.equipment.items,
        ...body.equipment.items,
      };
    }
    if (body.equipment.currency) {
      console.log("possui body.equipment.currency");
      body.equipment.currency = {
        ...character.equipment.currency,
        ...body.equipment.currency,
      };
    }
  }
  if (body.spells) {
    console.log("possui body.spells");
    if (body.spells?.slots) {
      console.log("possui body.spells.slots");
      body.spells.slots = {
        ...character.spells.slots,
        ...body.spells.slots,
      };
    }
    if (body.spells?.spells) {
      console.log("possui body.spells.spells");
      body.spells.spells = {
        ...character.spells.spells,
        ...body.spells.spells,
      };
    }
    body.spells = {
      ...character.spells,
      ...body.spells,
    };
  }
  if (body.appearance) {
    console.log("possui body.appearance");
    body.appearance = {
      ...character.appearance,
      ...body.appearance,
    };
  }
  return body;
}

export default router;
