const db = require("../config/db");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.registro = async (req, res) => {
  try {
    const {
      idTipoID,
      nombre,
      apellido,
      correo,
      contraseña,
      idGenero,
      rol
    } = req.body;

    // Verificar si ya existe
    const [existe] = await db.query(
      "SELECT * FROM usuarios WHERE correo = ?",
      [correo]
    );
    if (existe.length > 0) {
      return res.status(400).json({ error: "El correo ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(contraseña, 10);
    const codigo = Math.floor(100000 + Math.random() * 900000);

    await db.query(
      `INSERT INTO usuarios 
      (idTipoID, nombre, apellido, correo, contraseña, idGenero, verificado, codigo_verificacion, rol)
      VALUES (?, ?, ?, ?, ?, ?, 0, ?, ?)`,
      [
        idTipoID,
        nombre,
        apellido,
        correo,
        hashedPassword,
        idGenero,
        codigo,
        rol || 1, // Si no envía rol es usuario normal
      ]
    );

    // Enviar email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: correo,
      subject: "Código de verificación",
      text: `Tu código es: ${codigo}`,
    });

    res.json({ message: "Usuario registrado. Revisa tu correo." });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
};
