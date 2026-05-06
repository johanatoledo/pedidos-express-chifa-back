import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pedidosRoutes from "./routes/pedidos.routes.js";
import { db } from "./config/db.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4001;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API Chifa Express funcionando correctamente",
  });
});

app.get("/api/health", async (req, res) => {
  try {
    await db.query("SELECT 1");

    res.json({
      status: "ok",
      database: "connected",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      database: "disconnected",
    });
  }
});

app.use("/api/pedidos", pedidosRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "Ruta no encontrada",
  });
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});