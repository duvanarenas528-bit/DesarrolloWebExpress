const express = require('express');
const router = express.Router();
const registroController = require('../controller/registro.controller');

router.post('/', registroController.registrarUsuario); // 🔹 Aquí debe coincidir el nombre de la función

module.exports = router;
