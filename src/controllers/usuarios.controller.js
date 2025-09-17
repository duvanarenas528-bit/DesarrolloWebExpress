// usuarios.controller.js
const usuarioService = require("./usuarios.services");

const getUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioService.getUsuarios();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

const createUsuario = async (req, res) => {
  try {
    const nuevo = await usuarioService.createUsuario(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: "Error al crear usuario" });
  }
};

module.exports = { getUsuarios, createUsuario };
