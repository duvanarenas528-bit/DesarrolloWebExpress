const express = require('express');
const router = express.Router();
const reporteController = require('../controller/reportes.controller');

router.get('/estadisticas', reporteController.getEstadisticas);

module.exports = router;
