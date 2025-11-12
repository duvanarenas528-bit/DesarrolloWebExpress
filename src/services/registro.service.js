const db = require('../config/db');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

// Configurar el transporte de correo
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Crear usuario nuevo
exports.create = async ({ idTipoID, nombre, apellido, correo, contraseña, idGenero }) => {
  try {
    // Encriptar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    // Generar código de verificación (6 dígitos)
    const codigoVerificacion = Math.floor(100000 + Math.random() * 900000);

    const query = `
      INSERT INTO usuarios (idTipoID, nombre, apellido, correo, contraseña, idGenero, codigo_verificacion, verificado)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.execute(query, [
      idTipoID,
      nombre,
      apellido,
      correo,
      hashedPassword,
      idGenero,
      codigoVerificacion,
      0 // verificado = falso por defecto
    ]);

    // ✉️ Enviar correo con el código de verificación
    await transporter.sendMail({
      from: `"Soporte del Sistema" <${process.env.EMAIL_USER}>`,
      to: correo,
      subject: "Código de Verificación de Cuenta",
      html: `
        <h2>Hola ${nombre} ${apellido} 👋</h2>
        <p>Gracias por registrarte. Tu código de verificación es:</p>
        <h1 style="color:#2e86de;">${codigoVerificacion}</h1>
        <p>Por favor, ingrésalo en la aplicación para activar tu cuenta.</p>
        <br>
        <p>Si no creaste una cuenta, ignora este mensaje.</p>
      `
    });

    console.log(`✅ Correo de verificación enviado a ${correo}`);

    return { id: result.insertId, codigoVerificacion };
  } catch (error) {
    console.error("❌ Error en registro.service:", error);
    throw error;
  }
};

// Guardar código de verificación (si se necesita actualizar)
exports.guardarCodigoVerificacion = async (correo, codigo) => {
  try {
    const query = "UPDATE usuarios SET codigo_verificacion = ? WHERE correo = ?";
    await db.execute(query, [codigo, correo]);
  } catch (error) {
    console.error("Error al guardar código de verificación:", error);
    throw error;
  }
};

// Verificar el código enviado al correo
exports.verificarCodigo = async (correo, codigo) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM usuarios WHERE correo = ? AND codigo_verificacion = ?",
      [correo, codigo]
    );

    if (rows.length === 0) return false;

    // Marcar como verificado
    await db.execute(
      "UPDATE usuarios SET verificado = 1 WHERE correo = ?",
      [correo]
    );

    return true;
  } catch (error) {
    console.error("Error al verificar código:", error);
    throw error;
  }
};
