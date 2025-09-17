// app.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Importar routes
const loginRoutes = require("./login.routes");
const registroRoutes = require("./registro.routes");
const usuariosRoutes = require("./usuarios.routes");
const vehiculosRoutes = require("./vehiculos.routes");
const reportesRoutes = require("./reportes.routes");
const pagosRoutes = require("./pagos.routes");

// Usar routes
app.use("/api", loginRoutes);
app.use("/api", registroRoutes);
app.use("/api", usuariosRoutes);
app.use("/api", vehiculosRoutes);
app.use("/api", reportesRoutes);
app.use("/api", pagosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
