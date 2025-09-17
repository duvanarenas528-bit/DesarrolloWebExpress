const reportesService = require('../services/reportes.service'); 


exports.getEstadisticas = async (req, res) => {
    try {
        const data = await reporteService.getEstadisticas();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Error al generar reportes", error });
    }
};
