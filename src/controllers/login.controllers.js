const loginService = require('../services/login.service');

exports.login = async (req, res) => {
    try {
        const { correo, contraseña } = req.body;
        const user = await loginService.login(correo, contraseña);

        if (!user) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }

        res.status(200).json({ message: "Login exitoso", user });
    } catch (error) {
        res.status(500).json({ message: "Error en el login", error });
    }
};
