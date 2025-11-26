// src/middleware/auth.middleware.js
const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const header = req.headers["authorization"];

  if (!header) {
    return res.status(403).json({ message: "Token requerido" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

exports.soloAdmin = (req, res, next) => {
  if (req.user.rol !== 2) {
    return res.status(403).json({ message: "Acceso denegado: Solo Admin" });
  }
  next();
};
