// usuarios.services.js
const db = require("./db");

const getUsuarios = async () => {
  const [rows] = await db.query("SELECT * FROM usuarios");
  return rows;
};

const createUsuario = async (data) => {
  const { nombre, email, password } = data;
  await db.query("INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)", [
    nombre, email, password
  ]);
  return { message: "Usuario creado correctamente" };
};

module.exports = { getUsuarios, createUsuario };
