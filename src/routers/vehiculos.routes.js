// src/routers/vehiculos.routes.js
const express = require("express");
const router = express.Router();

const vehiculosController = require("../controller/vehiculos.controller");
const { verifyToken } = require("../middleware/auth.middleware");

// Listar todos los vehículos
router.get("/", verifyToken, vehiculosController.findAll);

// Crear un vehículo
router.post("/", verifyToken, vehiculosController.create);

// Buscar vehículo por ID
router.get("/:id", verifyToken, vehiculosController.findById);

// Actualizar vehículo
router.put("/:id", verifyToken, vehiculosController.update);

// Eliminar vehículo
router.delete("/:id", verifyToken, vehiculosController.remove);

module.exports = router;
