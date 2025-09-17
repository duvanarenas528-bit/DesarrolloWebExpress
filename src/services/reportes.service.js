const db = require('../config/db');

exports.getEstadisticas = async () => {
    const [usuarios] = await db.execute('SELECT COUNT(*) AS total FROM usuarios');
    const [vehiculos] = await db.execute('SELECT COUNT(*) AS total FROM vehiculos');
    const [pagos] = await db.execute('SELECT COUNT(*) AS total FROM pagos');

    return {
        totalUsuarios: usuarios[0].total,
        totalVehiculos: vehiculos[0].total,
        totalPagos: pagos[0].total
    };
};
