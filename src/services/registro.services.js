const pool = require('../db');

const create = async (vehiculo) => {
  const { placa, nombre, tipo, telefono, fecha_ingreso, servicios } = vehiculo;
  const query = `
    INSERT INTO vehiculos (placa, nombre, tipo_vehiculo, telefono, fecha_ingreso, servicios)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  await pool.query(query, [placa, nombre, tipo, telefono, fecha_ingreso, servicios]);
};

module.exports = { create };
