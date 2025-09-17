// src/controller/login.controller.js
const loginService = require('../services/login.service');

exports.login = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    if (!correo || !contraseña) {
      return res.status(400).json({ message: "Correo y contraseña son obligatorios" });
    }

    const user = await loginService.login(correo, contraseña);

    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    res.status(200).json({ message: "Login exitoso", user });
  } catch (error) {
    console.error("Error en login.controller:", error);
    res.status(500).json({ message: "Error en el login", error: error.message });
  }
};
