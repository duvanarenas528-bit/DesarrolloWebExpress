const vehiculoService = require('../services/vehiculo.service');

exports.findAll = async (req, res) => {
    try {
        const vehiculos = await vehiculoService.findAll();
        res.status(200).json(vehiculos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener vehículos", error });
    }
};

exports.findById = async (req, res) => {
    try {
        const vehiculo = await vehiculoService.findById(req.params.id);
        if (!vehiculo) {
            return res.status(404).json({ message: "Vehículo no encontrado" });
        }
        res.status(200).json(vehiculo);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el vehículo", error });
    }
};

exports.create = async (req, res) => {
    try {
        const newVehiculo = await vehiculoService.create(req.body);
        res.status(201).json(newVehiculo);
    } catch (error) {
        res.status(500).json({ message: "Error al registrar vehículo", error });
    }
};

exports.update = async (req, res) => {
    try {
        const updated = await vehiculoService.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: "Vehículo no encontrado" });
        }
        res.status(200).json({ message: "Vehículo actualizado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar vehículo", error });
    }
};

exports.remove = async (req, res) => {
    try {
        const removed = await vehiculoService.remove(req.params.id);
        if (!removed) {
            return res.status(404).json({ message: "Vehículo no encontrado" });
        }
        res.status(200).json({ message: "Vehículo eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar vehículo", error });
    }
};
