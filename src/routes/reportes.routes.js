const express = require('express');
const router = express.Router();
const reporteController = require('../controllers/reporte.controller');

router.get('/estadisticas', reporteController.getEstadisticas);

module.exports = router;
