const getUsuarios = (req, res) => {
  res.json({ message: 'Lista de usuarios' });
};

const getUsuarioPorId = (req, res) => {
  res.json({ message: `Usuario con id ${req.params.id}` });
};

const createUsuario = (req, res) => {
  res.json({ message: 'Usuario creado' });
};

const updateUsuario = (req, res) => {
  res.json({ message: `Usuario ${req.params.id} actualizado` });
};

const deleteUsuario = (req, res) => {
  res.json({ message: `Usuario ${req.params.id} eliminado` });
};

module.exports = {
  getUsuarios,
  getUsuarioPorId,
  createUsuario,
  updateUsuario,
  deleteUsuario,
};
