const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Routers
const loginRoutes = require("./routers/login.routes");
const registroRoutes = require("./routers/registro.routes");
const usuariosRoutes = require("./routers/usuarios.routes");
const vehiculosRoutes = require("./routers/vehiculos.routes");
const reportesRoutes = require("./routers/reportes.routes");
const pagosRoutes = require("./routers/pagos.routes");

app.use("/api/login", loginRoutes);
app.use("/api/registro", registroRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/vehiculos", vehiculosRoutes);
app.use("/api/reportes", reportesRoutes);
app.use("/api/pagos", pagosRoutes);

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
