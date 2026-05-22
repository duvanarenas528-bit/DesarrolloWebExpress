const db = require('../config/db');

exports.getUsuarios = async () => {
  const [rows] = await db.query("SELECT * FROM usuarios");
  return rows;
};

exports.createUsuario = async (data) => {
  const { nombre, email, password } = data;
  const [result] = await db.query(
    "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)",
    [nombre, email, password]
  );
  return { id: result.insertId, nombre, email };
};

// 🔥 Nuevo método para autenticación (login)
exports.findByEmail = async (email) => {
  const [rows] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);
  return rows[0] || null;
};
