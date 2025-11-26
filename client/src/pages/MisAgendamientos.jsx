import React, { useEffect, useState } from "react";

const MisAgendamientos = ({ userId, token }) => {
  const [agendas, setAgendas] = useState([]);
  const [editData, setEditData] = useState(null); // 👉 datos del agendamiento a editar
  const [nuevaFecha, setNuevaFecha] = useState("");
  const [nuevaHora, setNuevaHora] = useState("");

  const cargarAgendas = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/agendamientos/user/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (!res.ok) return;
      const data = await res.json();
      setAgendas(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cargarAgendas();
  }, []);

  // ===============================
  // 🟦 ELIMINAR AGENDAMIENTO
  // ===============================
  const cancelarAgendamiento = async (id) => {
    if (!confirm("¿Seguro que deseas cancelar este agendamiento?")) return;

    try {
      await fetch(`http://localhost:3000/agendamientos/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Agendamiento eliminado");
      cargarAgendas();
    } catch (error) {
      console.error(error);
      alert("Error al eliminar");
    }
  };

  // ===============================
  // 🟨 ABRIR MODAL DE EDICIÓN
  // ===============================
  const abrirEditar = (a) => {
    setEditData(a);
    setNuevaFecha(a.fecha);
    setNuevaHora(a.hora);
  };

  // ===============================
  // 🟩 GUARDAR CAMBIOS DE EDICIÓN
  // ===============================
  const guardarEdicion = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/agendamientos/${editData.idAgendamiento}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            fecha: nuevaFecha,
            hora: nuevaHora
          })
        }
      );

      const result = await res.json();
      if (!res.ok) return alert(result.message);

      alert("Agendamiento actualizado correctamente");
      setEditData(null);
      cargarAgendas();

    } catch (error) {
      console.error(error);
      alert("Error al actualizar");
    }
  };

  return (
    <div style={box}>
      <h2 style={{ color: "white" }}>Mis Agendamientos</h2>

      {agendas.length === 0 && (
        <p style={{ color: "white" }}>No tienes agendamientos registrados.</p>
      )}

      <div style={grid}>
        {agendas.map((a) => (
          <div key={a.idAgendamiento} style={item}>
            <div>
              <p><strong>Placa:</strong> {a.placa}</p>
              <p><strong>Tipo:</strong> {a.tipo_vehiculo}</p>
              <p><strong>Fecha:</strong> {a.fecha}</p>
              <p><strong>Hora:</strong> {a.hora}</p>
              <p><strong>Estado:</strong> {a.estado}</p>
            </div>

            <div style={btnContainer}>
              <button style={btnEditar} onClick={() => abrirEditar(a)}>
                Editar
              </button>

              <button
                style={btnEliminar}
                onClick={() => cancelarAgendamiento(a.idAgendamiento)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ===============================
          🟦 MODAL PARA EDITAR
      =============================== */}
      {editData && (
        <div style={overlay}>
          <div style={modal}>
            <h3>Editar Agendamiento</h3>

            <label>Fecha</label>
            <input
              type="date"
              value={nuevaFecha}
              onChange={(e) => setNuevaFecha(e.target.value)}
              style={input}
            />

            <label>Hora</label>
            <input
              type="time"
              value={nuevaHora}
              onChange={(e) => setNuevaHora(e.target.value)}
              style={input}
            />

            <button style={btnGuardar} onClick={guardarEdicion}>
              Guardar Cambios
            </button>

            <button style={btnCerrar} onClick={() => setEditData(null)}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/* =========== ESTILOS =========== */

const box = {
  width: "80%",
  background: "#020000ff",
  padding: "20px",
  borderRadius: "10px",
  color: "white",
  margin: "auto",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  gap: "20px",
  marginTop: "20px",
};

const item = {
  padding: "20px",
  background: "#ffdd00ff",
  borderRadius: "10px",
  color: "black",
  boxShadow: "0px 2px 5px rgba(0,0,0,0.3)",
};

const btnContainer = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "15px",
};

const btnEditar = {
  background: "#000",
  color: "white",
  padding: "10px 15px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",
};

const btnEliminar = {
  background: "red",
  color: "white",
  padding: "10px 15px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",
};

/* =========== MODAL =========== */

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
  cursor: "pointer",
  borderRadius: "6px",
  fontWeight: "bold",
};

const btnCerrar = {
  background: "black",
  color: "white",
  border: "none",
  padding: "12px",
  cursor: "pointer",
  borderRadius: "6px",
};

export default MisAgendamientos;
