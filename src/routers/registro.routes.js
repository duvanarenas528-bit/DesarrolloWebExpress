const express = require("express");
const router = express.Router();
const registroController = require("../controller/registro.controller");

// Ruta para registrar usuario
router.post("/", registroController.registro);

module.exports = router; 