const db = require("../config/db");

// Obtener todos los vehículos del usuario
exports.findAll = async (req, res) => {
  try {
    const idPersona = req.user.idPersona;

    const [rows] = await db.execute(
      "SELECT * FROM vehiculos WHERE idPersona = ?",
      [idPersona]
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error al obtener vehículos:", error);
    res.status(500).json({ message: "Error al obtener vehículos" });
  }
};

// Crear vehículo
exports.create = async (req, res) => {
  try {
    const {
      placa,
      nombre,
      tipo_vehiculo,
      telefono,
      fecha_ingreso,
      servicios
    } = req.body;

    const idPersona = req.user.idPersona; // 🔥 del token

    if (!placa || !nombre || !tipo_vehiculo || !telefono || !fecha_ingreso) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    const query = `
      INSERT INTO vehiculos 
      (placa, nombre, tipo_vehiculo, telefono, fecha_ingreso, servicios, idPersona)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.execute(query, [
      placa,
      nombre,
      tipo_vehiculo,
      telefono,
      fecha_ingreso,
      servicios || "",
      idPersona
    ]);

    res.status(201).json({
      message: "Vehículo registrado correctamente",
      idVehiculo: result.insertId
    });

  } catch (error) {
    console.error("Error al registrar vehículo:", error);
    res.status(500).json({ message: "Error al registrar vehículo" });
  }
};

// Buscar vehículo por ID
exports.findById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.execute(
      "SELECT * FROM vehiculos WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Vehículo no encontrado" });
    }

    res.status(200).json(rows[0]);

  } catch (error) {
    console.error("Error al buscar vehículo:", error);
    res.status(500).json({ message: "Error al buscar vehículo" });
  }
};

// Actualizar vehículo
exports.update = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      placa,
      nombre,
      tipo_vehiculo,
      telefono,
      fecha_ingreso,
      servicios
    } = req.body;

    const query = `
      UPDATE vehiculos
      SET placa = ?, nombre = ?, tipo_vehiculo = ?, telefono = ?, fecha_ingreso = ?, servicios = ?
      WHERE id = ?
    `;

    const [result] = await db.execute(query, [
      placa,
      nombre,
      tipo_vehiculo,
      telefono,
      fecha_ingreso,
      servicios,
      id
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Vehículo no encontrado" });
    }

    res.status(200).json({ message: "Vehículo actualizado correctamente" });

  } catch (error) {
    console.error("Error al actualizar vehículo:", error);
    res.status(500).json({ message: "Error al actualizar vehículo" });
  }
};

// Eliminar vehículo
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.execute(
      "DELETE FROM vehiculos WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Vehículo no encontrado" });
    }

    res.status(200).json({ message: "Vehículo eliminado correctamente" });

  } catch (error) {
    console.error("Error al eliminar vehículo:", error);
    res.status(500).json({ message: "Error al eliminar vehículo" });
  }
};
