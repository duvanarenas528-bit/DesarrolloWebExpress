let vehiculos = [
  { id: 1, marca: "Toyota", modelo: "Corolla", año: 2020 },
  { id: 2, marca: "Mazda", modelo: "CX-5", año: 2021 }
];

exports.findAll = async () => vehiculos;

exports.findById = async (id) => vehiculos.find(v => v.id === parseInt(id));

exports.create = async (data) => {
  const newVehiculo = { id: vehiculos.length + 1, ...data };
  vehiculos.push(newVehiculo);
  return newVehiculo;
};

exports.update = async (id, data) => {
  const index = vehiculos.findIndex(v => v.id === parseInt(id));
  if (index === -1) return null;
  vehiculos[index] = { ...vehiculos[index], ...data };
  return vehiculos[index];
};

exports.remove = async (id) => {
  const index = vehiculos.findIndex(v => v.id === parseInt(id));
  if (index === -1) return null;
  const deleted = vehiculos.splice(index, 1);
  return deleted[0];
};
