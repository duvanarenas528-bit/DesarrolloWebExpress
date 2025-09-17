// src/services/login.service.js
const db = require('../config/db');

exports.login = async (correo, contraseña) => {
  const query = `
    SELECT * FROM usuarios WHERE correo = ? AND contraseña = ?
  `;

  const [rows] = await db.execute(query, [correo, contraseña]);

  return rows[0] || null; // devuelve el usuario si existe
};
