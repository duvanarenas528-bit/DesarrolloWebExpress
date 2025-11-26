const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const usuariosController = require("../controller/usuarios.controller");

// Orden recomendado (primero rutas específicas)
router.put("/cambiar-password/:id", authMiddleware, usuariosController.cambiarPassword);

// Obtener usuario por ID
router.get("/:id", authMiddleware, usuariosController.getUsuarioPorId);

// Actualizar usuario
router.put("/:id", authMiddleware, usuariosController.updateUsuario);

// Eliminar usuario
router.delete("/:id", authMiddleware, usuariosController.deleteUsuario);

module.exports = router;
