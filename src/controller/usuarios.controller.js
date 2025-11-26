const db = require("../config/db");
const bcrypt = require("bcryptjs");

// ===========================
// Obtener TODOS los usuarios
// ===========================
exports.getUsuarios = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM usuarios");
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

// ===========================
// Obtener usuario por idPersona
// ===========================
exports.getUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM usuarios WHERE idPersona = ?",
      [id]
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

// ===========================
// Actualizar usuario
// ===========================
exports.updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, correo } = req.body;

    if (!nombre || !apellido || !correo) {
      return res.status(400).json({ message: "Campos incompletos" });
    }

    await db.query(
      "UPDATE usuarios SET Nombre=?, Apellido=?, correo=? WHERE idPersona=?",
      [nombre, apellido, correo, id]
    );

    res.json({ message: "Usuario actualizado correctamente" });

  } catch (error) {
    console.error("Error actualizando usuario:", error);
    res.status(500).json({ message: "Error actualizando usuario" });
  }
};

// ===========================
// Cambiar contraseña
// ===========================
exports.cambiarPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { actual, nueva } = req.body;

    if (!actual || !nueva) {
      return res.status(400).json({ message: "Campos incompletos" });
    }

    const [rows] = await db.query(
      "SELECT contraseña FROM usuarios WHERE idPersona = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const contraseñaReal = rows[0].contraseña;

    const coincide = await bcrypt.compare(actual, contraseñaReal);
    if (!coincide) {
      return res.status(400).json({ message: "Contraseña actual incorrecta" });
    }

    const nuevaHash = await bcrypt.hash(nueva, 10);

    await db.query(
      "UPDATE usuarios SET contraseña=? WHERE idPersona=?",
      [nuevaHash, id]
    );

    res.json({ message: "Contraseña cambiada correctamente" });

  } catch (error) {
    console.error("Error cambiando contraseña:", error);
    res.status(500).json({ message: "Error cambiando contraseña" });
  }
};

// ===========================
// Eliminar usuario
// ===========================
exports.deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query("DELETE FROM usuarios WHERE idPersona=?", [id]);

    res.json({ message: "Cuenta eliminada correctamente" });

  } catch (error) {
    console.error("Error eliminando usuario:", error);
    res.status(500).json({ message: "Error eliminando usuario" });
  }
};

// ===========================
// Subir foto de perfil
// ===========================
exports.subirFoto = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({ message: "No se subió ninguna imagen" });
    }

    const nombreArchivo = req.file.filename;

    await db.query(
      "UPDATE usuarios SET foto=? WHERE idPersona=?",
      [nombreArchivo, id]
    );

    res.json({
      message: "Foto actualizada correctamente",
      foto: nombreArchivo
    });

  } catch (error) {
    console.error("Error subiendo foto:", error);
    res.status(500).json({ message: "Error subiendo foto" });
  }
};
