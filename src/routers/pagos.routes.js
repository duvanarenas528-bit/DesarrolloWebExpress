const express = require('express');
const router = express.Router();
const pagoController = require('../controller/pago.controller');

router.get('/', pagoController.findAll);
router.get('/:id', pagoController.findById);
router.post('/', pagoController.create);

module.exports = router;
