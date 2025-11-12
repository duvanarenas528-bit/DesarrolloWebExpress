const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // <-- Importa CORS
const db = require("./config/db");
const verifyRoutes = require("./routers/verify.routes");

dotenv.config();

const app = express(); // <-- Primero creamos 'app'
const PORT = process.env.PORT || 3000;

// 🟢 Configurar CORS antes de las rutas
app.use(cors({
  origin: "http://localhost:5173", // URL del frontend (Vite)
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Middleware para parsear JSON
app.use(express.json());

// Importar rutas
const usuariosRoutes = require("./routers/usuarios.routes");
const vehiculosRoutes = require("./routers/vehiculos.routes");
const reportesRoutes = require("./routers/reportes.routes");
const pagosRoutes = require("./routers/pagos.routes");
const dashboardRoutes = require("./routers/dashboard.routes");
const loginRoutes = require("./routers/login.routes");
const registroRoutes = require("./routers/registro.routes");
const authRoutes = require("./routers/auth.routes");

// Montar rutas
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/vehiculos", vehiculosRoutes);
app.use("/api/reportes", reportesRoutes);
app.use("/api/pagos", pagosRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/registro", registroRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", verifyRoutes);

// Test de conexión a la base de datos
(async () => {
  try {
    await db.getConnection();
    console.log("✅ Conectado a la base de datos");
  } catch (err) {
    console.error("❌ Error de conexión a la base de datos:", err.message);
    process.exit(1);
  }
})();

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
