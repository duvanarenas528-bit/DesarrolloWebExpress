// src/components/Dashboard.jsx
import "./Dashboard.css";

export default function Dashboard({ user }) {
  return (
    <div className="dashboard">
      <h1>Bienvenido, {user?.nombre || "Usuario"} 👋</h1>
      <p>Este es tu panel principal.</p>

      <div className="cards">
        <div className="card">Información personal</div>
        <div className="card">Historial</div>
        <div className="card">Configuración</div>
      </div>
    </div>
  );
}
