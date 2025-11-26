// server.js

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./config/db");

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Middleware JSON
app.use(express.json());
app.use("/uploads", express.static("src/uploads"));


// Importar rutas
const loginRoutes = require("./routers/login.routes");
const registroRoutes = require("./routers/registro.routes");
const usuariosRoutes = require("./routers/usuarios.routes");
const vehiculosRoutes = require("./routers/vehiculos.routes");
const reportesRoutes = require("./routers/reportes.routes");
const pagosRoutes = require("./routers/pagos.routes");
const dashboardRoutes = require("./routers/dashboard.routes");
const agendamientosRoutes = require("./routers/agendamientos.routes");
const verifyRoutes = require("./routers/verify.routes");
const authRoutes = require("./routers/auth.routes");

// Montar rutas

app.use("/api/login", loginRoutes);
app.use("/api/registro", registroRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/vehiculos", vehiculosRoutes);
app.use("/agendamientos", agendamientosRoutes);
app.use("/api/reportes", reportesRoutes);
app.use("/api/pagos", pagosRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", verifyRoutes);

// Test de BD
(async () => {
  try {
    await db.getConnection();
    console.log("✅ Conectado a la base de datos");
  } catch (err) {
    console.error("❌ Error de conexión:", err.message);
    process.exit(1);
  }
})();

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
