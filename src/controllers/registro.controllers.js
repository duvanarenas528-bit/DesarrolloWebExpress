const registroService = require('../services/registro.services');

const registrarVehiculo = async (req, res) => {
  try {
    const { placa, nombre, tipo, telefono, fecha_ingreso, servicios } = req.body;

    await registroService.create({
      placa,
      nombre,
      tipo,
      telefono,
      fecha_ingreso,
      servicios: servicios?.join(', ') || 'Ninguno'
    });

    res.status(201).json({ message: 'Vehículo registrado correctamente' });
  } catch (error) {
    console.error('Error en registro.controller:', error);
    res.status(500).json({ message: 'Error al registrar vehículo' });
  }
};

module.exports = { registrarVehiculo };
