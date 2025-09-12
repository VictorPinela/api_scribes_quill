import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import characterRoutes from "./routes/character";
import userRoutes from "./routes/user";
import authRoutes from "./routes/auth";
import { authenticateToken } from "./middleware/auth";

dotenv.config({ quiet: true });

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

const mongoURI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/scribesquill";

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("✅ Conectado ao MongoDB com sucesso!");
  })
  .catch((error) => {
    console.error("❌ Erro ao conectar ao MongoDB:", error);
    process.exit(1);
  });

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "🚀 API do Scribe's Quill está funcionando!" });
});

app.use("/auth", authRoutes);

app.use("/characters", authenticateToken, characterRoutes);
app.use("/users", authenticateToken, userRoutes);

app.use(/(.*)/, (req: Request, res: Response) => {
  res.status(404).json({ message: "Rota não encontrada" });
});

app.listen(port, () => {
  console.log(`⚡ Servidor rodando na porta ${port}`);
});
