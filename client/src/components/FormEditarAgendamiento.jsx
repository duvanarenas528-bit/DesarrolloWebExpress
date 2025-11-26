import React, { useState } from "react";

const FormEditarAgendamiento = ({ data, token, onClose }) => {
  const [fecha, setFecha] = useState(data.fecha);
  const [hora, setHora] = useState(data.hora);

  const guardarCambios = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/agendamientos/${data.idAgendamiento}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ fecha, hora }),
        }
      );

      const result = await res.json();
      if (!res.ok) {
        alert(result.message || "Error al actualizar");
        return;
      }

      alert("Agendamiento actualizado correctamente");
      onClose(); // cerrar modal
    } catch (error) {
      console.error(error);
      alert("Error al actualizar");
    }
  };

  return (
    <div style={overlay}>
      <div style={modal}>
        <h2>Editar Agendamiento</h2>

        <label>Fecha</label>
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          style={input}
        />

        <label>Hora</label>
        <input
          type="time"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
          style={input}
        />

        <button style={btnGuardar} onClick={guardarCambios}>
          Guardar Cambios
        </button>

        <button style={btnCerrar} onClick={onClose}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

/* === ESTILOS MODAL === */

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
};

const modal = {
  background: "white",
  padding: "30px",
  borderRadius: "10px",
  width: "350px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const input = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid black",
};

const btnGuardar = {
  background: "#FFD700",
  border: "none",
  padding: "12px",
  fontWeight: "bold",
  cursor: "pointer",
  borderRadius: "6px",
};

const btnCerrar = {
  background: "black",
  color: "white",
  border: "none",
  padding: "12px",
  cursor: "pointer",
  borderRadius: "6px",
};

export default FormEditarAgendamiento;
