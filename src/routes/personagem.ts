import express, { Request, Response } from 'express';
import { Personagem } from '../models/Personagem';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const personagens = await Personagem.find();
    res.json(personagens);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar personagens', error });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const personagem = await Personagem.findById(req.params.id);
    if (!personagem) {
      return res.status(404).json({ message: 'Personagem não encontrado' });
    }
    res.json(personagem);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar personagem', error });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const novoPersonagem = new Personagem(req.body);
    const personagem = await novoPersonagem.save();
    res.status(201).json(personagem);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar personagem', error });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const personagem = await Personagem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!personagem) {
      return res.status(404).json({ message: 'Personagem não encontrado' });
    }
    
    res.json(personagem);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar personagem', error });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const personagem = await Personagem.findByIdAndDelete(req.params.id);
    
    if (!personagem) {
      return res.status(404).json({ message: 'Personagem não encontrado' });
    }
    
    res.json({ message: 'Personagem deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar personagem', error });
  }
});

export default router;