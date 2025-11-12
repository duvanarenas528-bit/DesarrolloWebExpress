import React from "react";

const Dashboard = ({ onLogout }) => {
  return (
    <div className="dashboard">
      <h1>Bienvenido al Panel 🚗</h1>
      <p>Has iniciado sesión correctamente.</p>
      <button onClick={onLogout}>Cerrar sesión</button>
    </div>
  );
};

export default Dashboard;
