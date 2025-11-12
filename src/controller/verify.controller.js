// src/controller/verify.controller.js
const db = require("../config/db");

exports.verifyCode = async (req, res) => {
  const { correo, codigo } = req.body;

  try {
    const [rows] = await db.query(
      "SELECT * FROM usuarios WHERE correo = ? AND codigo_verificacion = ?",
      [correo, codigo]
    );

    if (rows.length === 0) {
      return res.status(400).json({ error: "Código incorrecto ❌" });
    }

    await db.query(
      "UPDATE usuarios SET verificado = 1, codigo_verificacion = NULL WHERE correo = ?",
      [correo]
    );

    res.json({ message: "Correo verificado ✅" });
  } catch (error) {
    console.error("Error al verificar código:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};
