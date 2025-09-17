const db = require('../config/db');

exports.getDashboardData = async () => {
    const [usuarios] = await db.execute('SELECT COUNT(*) AS total FROM usuarios');
    const [vehiculos] = await db.execute('SELECT COUNT(*) AS total FROM vehiculos');

    return {
        usuarios: usuarios[0].total,
        visitas: vehiculos[0].total,
        disponibilidad: 100 - vehiculos[0].total
    };
};
