const jwt = require('jsonwebtoken');

// Middleware para verificar el token JWT
exports.verifyToken = (req, res, next) => {
  const header = req.headers['authorization'];
  
  if (!header) {
    return res.status(403).json({ message: 'Token requerido' });
  }

  const token = header.split(' ')[1]; // "Bearer token"

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Guarda los datos del usuario en la request
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};
