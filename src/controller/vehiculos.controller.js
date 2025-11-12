const db = require("../config/db");

// Obtener todos los vehículos
exports.findAll = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM vehiculos");
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error al obtener los vehículos:", error);
    res.status(500).json({ message: "Error al obtener los vehículos" });
  }
};

// Crear un nuevo vehículo
exports.create = async (req, res) => {
  try {
    const { placa, marca, modelo, color, idPersona } = req.body;

    if (!placa || !marca || !modelo || !color || !idPersona) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    const query = `
      INSERT INTO vehiculos (placa, marca, modelo, color, idPersona)
      VALUES (?, ?, ?, ?, ?)
    `;

    await db.execute(query, [placa, marca, modelo, color, idPersona]);

    res.status(201).json({ message: "Vehículo registrado correctamente" });
  } catch (error) {
    console.error("Error al crear vehículo:", error);
    res.status(500).json({ message: "Error al registrar el vehículo" });
  }
};

// Buscar un vehículo por ID
exports.findById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.execute("SELECT * FROM vehiculos WHERE idVehiculo = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Vehículo no encontrado" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error al buscar vehículo:", error);
    res.status(500).json({ message: "Error al buscar el vehículo" });
  }
};

// Actualizar un vehículo
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { placa, marca, modelo, color } = req.body;

    const query = `
      UPDATE vehiculos
      SET placa = ?, marca = ?, modelo = ?, color = ?
      WHERE idVehiculo = ?
    `;

    const [result] = await db.execute(query, [placa, marca, modelo, color, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Vehículo no encontrado" });
    }

    res.status(200).json({ message: "Vehículo actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar vehículo:", error);
    res.status(500).json({ message: "Error al actualizar el vehículo" });
  }
};

// Eliminar un vehículo
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.execute("DELETE FROM vehiculos WHERE idVehiculo = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Vehículo no encontrado" });
    }

    res.status(200).json({ message: "Vehículo eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar vehículo:", error);
    res.status(500).json({ message: "Error al eliminar el vehículo" });
  }
};
