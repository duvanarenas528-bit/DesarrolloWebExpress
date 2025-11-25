const express = require("express");
const router = express.Router();
const usuariosController = require("../controller/usuarios.controller");

router.get("/admin", usuariosController.getUsuarios);

module.exports = router;
