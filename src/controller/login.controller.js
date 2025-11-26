const jwt = require("jsonwebtoken");
const db = require("../config/db");
const bcrypt = require("bcryptjs");

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

    const passwordOk = await bcrypt.compare(contraseña, usuario.contraseña);

    if (!passwordOk) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // 🔥 Crear token con datos reales de tu tabla
    const token = jwt.sign(
      {
        idPersona: usuario.idPersona,
        correo: usuario.correo,
        nombre: usuario.Nombre,
        apellido: usuario.Apellido,
        rol: usuario.rol,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    // 🔥 Devolver datos completos
    res.json({
      message: "Login exitoso",
      token,
      usuario: {
        idPersona: usuario.idPersona,
        nombre: usuario.Nombre,
        apellido: usuario.Apellido,
        correo: usuario.correo,
        rol: usuario.rol,
      },
    });

  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};
