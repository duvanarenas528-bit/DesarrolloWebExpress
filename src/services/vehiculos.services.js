const db = require('../config/db.config');

exports.findAll = async () => {
    const [rows] = await db.execute('SELECT * FROM vehiculos');
    return rows;
};

exports.findById = async (id) => {
    const [rows] = await db.execute('SELECT * FROM vehiculos WHERE id = ?', [id]);
    return rows[0];
};

exports.create = async (newVehiculo) => {
    const [result] = await db.execute(
        'INSERT INTO vehiculos (placa, nombre, tipo_vehiculo, telefono, fecha_ingreso, servicios) VALUES (?, ?, ?, ?, ?, ?)',
        [newVehiculo.placa, newVehiculo.nombre, newVehiculo.tipo_vehiculo, newVehiculo.telefono, newVehiculo.fecha_ingreso, newVehiculo.servicios]
    );
    return { id: result.insertId, ...newVehiculo };
};

exports.update = async (id, updatedVehiculo) => {
    const [result] = await db.execute(
        'UPDATE vehiculos SET placa=?, nombre=?, tipo_vehiculo=?, telefono=?, fecha_ingreso=?, servicios=? WHERE id=?',
        [updatedVehiculo.placa, updatedVehiculo.nombre, updatedVehiculo.tipo_vehiculo, updatedVehiculo.telefono, updatedVehiculo.fecha_ingreso, updatedVehiculo.servicios, id]
    );
    return result.affectedRows > 0;
};

exports.remove = async (id) => {
    const [result] = await db.execute('DELETE FROM vehiculos WHERE id = ?', [id]);
    return result.affectedRows > 0;
};
