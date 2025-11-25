const db = require("../config/db");

// Obtener todos los usuarios
exports.getUsuarios = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM usuarios");
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

// Obtener usuario por ID
exports.getUsuarioPorId = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM usuarios WHERE idUsuario = ?",
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    res.status(500).json({ message: "Error al obtener usuario" });
  }
};

// Crear usuario (no lo usaremos todavía)
exports.createUsuario = (req, res) => {
  res.json({ message: "Usuario creado" });
};

// Actualizar usuario
exports.updateUsuario = (req, res) => {
  res.json({ message: `Usuario ${req.params.id} actualizado` });
};

// Eliminar usuario
exports.deleteUsuario = (req, res) => {
  res.json({ message: `Usuario ${req.params.id} eliminado` });
};
