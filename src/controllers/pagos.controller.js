const pagoService = require('../services/pago.service');

exports.findAll = async (req, res) => {
    try {
        const pagos = await pagoService.findAll();
        res.status(200).json(pagos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener pagos", error });
    }
};

exports.findById = async (req, res) => {
    try {
        const pago = await pagoService.findById(req.params.id);
        if (!pago) {
            return res.status(404).json({ message: "Pago no encontrado" });
        }
        res.status(200).json(pago);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el pago", error });
    }
};

exports.create = async (req, res) => {
    try {
        const newPago = await pagoService.create(req.body);
        res.status(201).json(newPago);
    } catch (error) {
        res.status(500).json({ message: "Error al registrar pago", error });
    }
};
