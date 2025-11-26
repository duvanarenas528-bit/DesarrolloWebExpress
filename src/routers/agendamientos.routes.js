const express = require("express");
const router = express.Router();

const controller = require("../controller/agendamientos.controller"); // 👈 correcta carpeta
const { verifyToken } = require("../middleware/auth.middleware");

// Crear agendamiento
router.post("/", verifyToken, controller.create);

// Obtener agendamientos por usuario
router.get("/user/:idPersona", verifyToken, controller.findByUser);

// 🔧 ➕ ACTUALIZAR agendamiento (NUEVO)
router.put("/:id", verifyToken, controller.update);

// Eliminar agendamiento
router.delete("/:id", verifyToken, controller.remove);

module.exports = router;
