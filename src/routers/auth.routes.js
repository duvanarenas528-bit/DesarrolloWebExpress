const express = require("express");
const router = express.Router();
const loginController = require("../controller/login.controller");
const authMiddleware = require("../middleware/auth.middleware");

// Ruta login
router.post("/login", loginController.login);

// Ruta protegida solo admin
router.get("/admin", authMiddleware.verifyToken, (req, res) => {
  if (req.user.rol !== "admin") {
    return res.status(403).json({ error: "Acceso denegado" });
  }

  res.json({ mensaje: "Bienvenido Admin" });
});

module.exports = router;
