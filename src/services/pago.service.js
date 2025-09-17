const db = require('../config/db');

exports.findAll = async () => {
    const [rows] = await db.execute('SELECT * FROM pagos');
    return rows;
};

exports.findById = async (id) => {
    const [rows] = await db.execute('SELECT * FROM pagos WHERE id = ?', [id]);
    return rows[0];
};

exports.create = async (newPago) => {
    const [result] = await db.execute(
        'INSERT INTO pagos (vehiculo_id, monto, fecha_pago, metodo) VALUES (?, ?, ?, ?)',
        [newPago.vehiculo_id, newPago.monto, newPago.fecha_pago, newPago.metodo]
    );
    return { id: result.insertId, ...newPago };
};
