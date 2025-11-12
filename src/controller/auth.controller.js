const jwt = require('jsonwebtoken');
const db = require('../config/db');
const bcrypt = require('bcryptjs');

// Login con generación de token
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const usuario = rows[0];
    const passwordValida = await bcrypt.compare(password, usuario.password);

    if (!passwordValida) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Crear token
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, nombre: usuario.nombre },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({ message: 'Login exitoso', token });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};
