const db = require("../config/db");

// =====================================
// Crear un agendamiento
// =====================================
exports.create = async (req, res) => {
  try {
    const { idVehiculo, fecha, hora } = req.body;
    const idPersona = req.user.idUsuario; // 👈 del token

    if (!idVehiculo || !fecha || !hora) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    const query = `
      INSERT INTO agendamientos (idVehiculo, idPersona, fecha, hora, estado)
      VALUES (?, ?, ?, ?, 'Pendiente')
    `;

    const [result] = await db.execute(query, [
      idVehiculo,
      idPersona,
      fecha,
      hora,
    ]);

    res.status(201).json({
      message: "Agendamiento registrado correctamente",
      idAgendamiento: result.insertId
    });
  } catch (error) {
    console.error("❌ Error al crear agendamiento:", error);
    res.status(500).json({ message: "Error al crear agendamiento" });
  }
};

// =====================================
// Buscar agendamientos por persona
// =====================================
exports.findByUser = async (req, res) => {
  try {
    const { idPersona } = req.params;

    const query = `
      SELECT a.*, v.placa, v.tipo_vehiculo
      FROM agendamientos a
      INNER JOIN vehiculos v ON v.id = a.idVehiculo
      WHERE a.idPersona = ?
      ORDER BY a.fecha DESC
    `;

    const [rows] = await db.execute(query, [idPersona]);

    res.status(200).json(rows);
  } catch (error) {
    console.error("❌ Error al obtener agendamientos:", error);
    res.status(500).json({ message: "Error al obtener agendamientos" });
  }
};

// =====================================
// ❗ ACTUALIZAR AGENDAMIENTO (nuevo)
// =====================================
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { fecha, hora } = req.body;

    if (!fecha || !hora) {
      return res.status(400).json({ message: "Fecha y hora son obligatorias" });
    }

    const [result] = await db.execute(
      `UPDATE agendamientos
       SET fecha = ?, hora = ?
       WHERE idAgendamiento = ?`,
      [fecha, hora, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Agendamiento no encontrado" });
    }

    res.json({ message: "Agendamiento actualizado correctamente" });

  } catch (error) {
    console.error("❌ Error actualizando agendamiento:", error);
    res.status(500).json({ message: "Error al actualizar agendamiento" });
  }
};

// =====================================
// Eliminar agendamiento
// =====================================
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.execute(
      "DELETE FROM agendamientos WHERE idAgendamiento = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Agendamiento no encontrado" });
    }

    res.status(200).json({ message: "Agendamiento eliminado" });

  } catch (error) {
    console.error("❌ Error al eliminar agendamiento:", error);
    res.status(500).json({ message: "Error al eliminar agendamiento" });
  }
};
