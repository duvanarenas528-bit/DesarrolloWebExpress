const dashboardService = require('../services/dashboard.service');

exports.getDashboardData = async (req, res) => {
    try {
        const data = await dashboardService.getDashboardData();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener datos del dashboard", error });
    }
};
