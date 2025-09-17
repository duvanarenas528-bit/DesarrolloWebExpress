const express = require('express');
const router = express.Router();
const registroController = require('../controller/registro.controller');



router.post('/', registroController.registrarVehiculo);

module.exports = router; // ✅ exporta el router
