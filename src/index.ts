import express, { Express, Request, Response } from "express";
import { authenticateToken } from "./middleware/auth";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import characterRoutes from "./routes/character";
import userRoutes from "./routes/user";
import authRoutes from "./routes/auth";
import backgroundRoutes from "./routes/background";
import classRoutes from "./routes/class";
import specieRoutes from "./routes/specie";
import spellRoutes from "./routes/spell";
import featRoutes from "./routes/feat";
import itemRoutes from "./routes/item";
import armorRoutes from "./routes/armor";
import magicItemRoutes from "./routes/magicItem";
import shieldRoutes from "./routes/shield";
import toolRoutes from "./routes/tool";
import weaponRoutes from "./routes/weapon";

dotenv.config({ quiet: true });

if (
  !process.env.MONGODB_URI ||
  !process.env.FRONTEND_URL ||
  !process.env.PORT
) {
  console.error("❌ Erro com variaveis de ambiente");
  process.exit(1);
}

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:5173"],
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Conectado ao MongoDB com sucesso!");
  })
  .catch((error) => {
    console.error("❌ Erro ao conectar ao MongoDB:", error);
    process.exit(1);
  });

app.get("/", async (req: Request, res: Response) => {
  res.json({ message: "🚀 API do Scribe's Quill está funcionando!" });
});

app.use("/auth", authRoutes);

app.use("/characters", authenticateToken, characterRoutes);
app.use("/users", authenticateToken, userRoutes);
app.use("/backgrounds", authenticateToken, backgroundRoutes);
app.use("/classes", authenticateToken, classRoutes);
app.use("/species", authenticateToken, specieRoutes);
app.use("/spells", authenticateToken, spellRoutes);
app.use("/feats", authenticateToken, featRoutes);
app.use("/items", authenticateToken, itemRoutes);
app.use("/armors", authenticateToken, armorRoutes);
app.use("/magicItems", authenticateToken, magicItemRoutes);
app.use("/shields", authenticateToken, shieldRoutes);
app.use("/tools", authenticateToken, toolRoutes);
app.use("/weapons", authenticateToken, weaponRoutes);

app.use(/(.*)/, (req: Request, res: Response) => {
  res.status(404).json({ message: "Rota invalida" });
});

app.listen(port, () => {
  console.log(`⚡ Servidor rodando em http://localhost:${port}`);
});

// Tratamento de erros não capturados
process.on("unhandledRejection", (reason, promise) => {
  console.error("Rejeição não tratada em:", promise, "motivo:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("Exceção não capturada:", error);
  // Não force a saída imediatamente, deixe o nodemon reiniciar
  process.exit(1);
});
