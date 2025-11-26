const pool = require("../config/db");


exports.getByUser = (idPersona) => {
  return db.query(
    `SELECT a.idAgendamiento, a.fecha, a.hora, a.estado, 
            v.placa, v.nombre, v.tipo_vehiculo
     FROM agendamientos a
     INNER JOIN vehiculos v ON v.id = a.idVehiculo
     WHERE a.idPersona = ?`,
    [idPersona]
  );
};

exports.delete = (idAgendamiento) => {
  return db.query(`DELETE FROM agendamientos WHERE idAgendamiento = ?`, [
    idAgendamiento,
  ]);
};

exports.update = (idAgendamiento, data) => {
  return db.query(`UPDATE agendamientos SET ? WHERE idAgendamiento = ?`, [
    data,
    idAgendamiento,
  ]);
};
