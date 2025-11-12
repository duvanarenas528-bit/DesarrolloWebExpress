// src/controller/login.controller.js
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    const [rows] = await db.query("SELECT * FROM usuarios WHERE correo = ?", [correo]);
    if (rows.length === 0) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    const user = rows[0];

    // Comparar la contraseña con bcrypt
    const validPassword = await bcrypt.compare(contraseña, user.contraseña);
    if (!validPassword) {
      return res.status(401).json({ error: "Credenciales no válidas" });
    }

    // Crear token
    const token = jwt.sign({ id: user.idUsuario, correo: user.correo }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // 🟢 Devuelve datos del usuario y token
    res.json({
      message: "Inicio de sesión exitoso",
      token,
      usuario: {
        idUsuario: user.idUsuario,
        nombre: user.nombre,
        apellido: user.apellido,
        correo: user.correo,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};
