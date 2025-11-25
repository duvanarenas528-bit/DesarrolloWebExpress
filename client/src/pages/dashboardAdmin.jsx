import React, { useEffect, useState } from "react";

const DashboardAdmin = ({ user, token, onLogout }) => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/usuarios/admin", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUsuarios(data);
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      }
    };

    cargarUsuarios();
  }, [token]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Administrador: {user.nombre}</h1>
      <button onClick={onLogout} style={{ marginBottom: "20px" }}>
        Cerrar sesión
      </button>

      <h2>Usuarios Registrados</h2>

      {usuarios.length === 0 ? (
        <p>No hay usuarios registrados.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "20px" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Verificado</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.idPersona}>
                <td>{u.idPersona}</td>
                <td>{u.Nombre}</td>
                <td>{u.Apellido}</td>
                <td>{u.correo}</td>
                <td>{u.rol === 2 ? "Admin" : "Usuario"}</td>
                <td>{u.verificado === 1 ? "Sí" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DashboardAdmin;
