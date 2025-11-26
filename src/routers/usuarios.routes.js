const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");
const usuariosController = require("../controller/usuarios.controller");

// ---------------------------
// Rutas ESPECÍFICAS PRIMERO
// ---------------------------

router.put("/foto/:id", verifyToken, upload.single("foto"), usuariosController.subirFoto);

router.put("/cambiar-password/:id", verifyToken, usuariosController.cambiarPassword);

// ---------------------------
// Rutas genéricas DESPUÉS
// ---------------------------

router.get("/", verifyToken, usuariosController.getUsuarios);

router.get("/:id", verifyToken, usuariosController.getUsuarioPorId);

router.put("/:id", verifyToken, usuariosController.updateUsuario);

router.delete("/:id", verifyToken, usuariosController.deleteUsuario);

module.exports = router;
