import React, { useState } from "react";

const FormVehiculo = ({ onClose, userId }) => {
  const [form, setForm] = useState({
    placa: "",
    nombre: "",
    tipo_vehiculo: "",
    telefono: "",
    fecha_ingreso: new Date().toISOString().slice(0, 10), // hoy
    idPersona: userId, // asigna el usuario logueado automáticamente
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/vehiculos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log("Vehículo registrado:", data);
      alert("Vehículo registrado correctamente!");
      onClose();
    } catch (error) {
      console.error("Error al registrar vehículo:", error);
      alert("Error al registrar vehículo");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "10px",
          minWidth: "400px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <h2>Registrar Vehículo</h2>

        <input
          type="text"
          name="placa"
          placeholder="Placa"
          value={form.placa}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del propietario"
          value={form.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="tipo_vehiculo"
          placeholder="Tipo de vehículo"
          value={form.tipo_vehiculo}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="telefono"
          placeholder="Teléfono"
          value={form.telefono}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="fecha_ingreso"
          value={form.fecha_ingreso}
          onChange={handleChange}
          required
        />

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
          <button type="submit" style={{ ...botonEstilo, flex: 1, marginRight: "10px" }}>
            Guardar
          </button>
          <button
            type="button"
            onClick={onClose}
            style={{ ...botonEstilo, flex: 1, backgroundColor: "#ccc", color: "#000" }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

const botonEstilo = {
  padding: "12px",
  border: "none",
  borderRadius: "8px",
  backgroundColor: "#FFD700",
  color: "#000",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "15px",
};

export default FormVehiculo;
