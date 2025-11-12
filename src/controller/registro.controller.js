const db = require("../config/db");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

// Configurar transporte de correo
const transporter = nodemailer.createTransport({
  service: "gmail", // o tu proveedor de correo
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.registro = async (req, res) => {
  try {
    const { idTipoID, nombre, apellido, correo, contraseña, idGenero } = req.body;

    // Verificar si el correo ya está registrado
    const [usuarioExistente] = await db.query(
      "SELECT * FROM usuarios WHERE correo = ?",
      [correo]
    );

    if (usuarioExistente.length > 0) {
      return res.status(400).json({ error: "El correo ya está registrado" });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    // Generar código de verificación (6 dígitos)
    const codigoVerificacion = Math.floor(100000 + Math.random() * 900000);

    // Guardar usuario en la base de datos
    await db.query(
      `INSERT INTO usuarios 
       (idTipoID, nombre, apellido, correo, contraseña, idGenero, verificado, codigo_verificacion)
       VALUES (?, ?, ?, ?, ?, ?, 0, ?)`,
      [idTipoID, nombre, apellido, correo, hashedPassword, idGenero, codigoVerificacion]
    );

    // Enviar correo con el código
    await transporter.sendMail({
      from: `"Tu App" <${process.env.EMAIL_USER}>`,
      to: correo,
      subject: "Código de verificación",
      html: `<p>Hola ${nombre},</p>
             <p>Tu código de verificación es: <b>${codigoVerificacion}</b></p>
             <p>Ingresa este código para verificar tu cuenta.</p>`,
    });

    res.json({ message: "Usuario registrado correctamente ✅. Revisa tu correo para verificar la cuenta." });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};
