const registroService = require('../services/registro.service');

exports.registrarUsuario = async (req, res) => {
  try {
    const { idTipoID, nombre, apellido, correo, contraseña, idGenero } = req.body;

    // Validación
    if (!idTipoID || !nombre || !apellido || !correo || !contraseña || !idGenero) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    // Crear usuario
    const userId = await registroService.create({
      idTipoID,
      nombre,
      apellido,
      correo,
      contraseña,
      idGenero
    });

    res.status(201).json({ message: "Usuario registrado correctamente", userId });
  } catch (error) {
    console.error("Error en registro.controller:", error);
    res.status(500).json({ message: "Error al registrar usuario", error: error.message });
  }
};
