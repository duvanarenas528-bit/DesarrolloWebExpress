// src/services/registro.service.js
const db = require('../config/db');

exports.create = async ({ idTipoID, nombre, apellido, correo, contraseña, idGenero }) => {
  const query = `
    INSERT INTO usuarios (idTipoID, nombre, apellido, correo, contraseña, idGenero)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const [result] = await db.execute(query, [
    idTipoID,
    nombre,
    apellido,
    correo,
    contraseña,
    idGenero
  ]);

  return result.insertId; // devuelve el ID del usuario creado
};
