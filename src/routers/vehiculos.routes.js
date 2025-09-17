const express = require('express');
const router = express.Router();
const vehiculoController = require('../controller/vehiculos.controller');

router.get('/', vehiculoController.findAll);
router.get('/:id', vehiculoController.findById);
router.post('/', vehiculoController.create);
router.put('/:id', vehiculoController.update);
router.delete('/:id', vehiculoController.remove);

module.exports = router;
