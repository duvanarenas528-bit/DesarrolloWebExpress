const express = require('express');
const router = express.Router();
const usuariosController = require('../controller/usuarios.controller');

// Definir rutas
router.get('/', usuariosController.getUsuarios);
router.get('/:id', usuariosController.getUsuarioPorId);
router.post('/', usuariosController.createUsuario);
router.put('/:id', usuariosController.updateUsuario);
router.delete('/:id', usuariosController.deleteUsuario);

// Exportar router
module.exports = router;
