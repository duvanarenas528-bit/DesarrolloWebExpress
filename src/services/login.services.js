const db = require('../config/db.config');

exports.login = async (correo, contraseña) => {
    const [rows] = await db.execute(
        'SELECT * FROM usuarios WHERE correo = ? AND contraseña = ?',
        [correo, contraseña]
    );
    return rows[0] || null;
};
