const jwt = require('jsonwebtoken');
const db = require('../config/db');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    const [rows] = await db.query(
      "SELECT * FROM usuarios WHERE correo = ?",
      [correo]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const usuario = rows[0];

    // Comparar contraseña correctamente
    const passwordOk = await bcrypt.compare(contraseña, usuario.contraseña);

    if (!passwordOk) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Crear token con el rol del usuario
    const token = jwt.sign(
      {
        id: usuario.idUsuario,
        correo: usuario.correo,
        nombre: usuario.nombre,
        rol: usuario.rol, // Usa el rol que viene desde la BD
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      message: "Login exitoso",
      token,
      usuario: {
        id: usuario.idUsuario,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol,
      },
    });

  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};
