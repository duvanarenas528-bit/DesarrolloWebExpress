import React, { useState } from "react";
import AuthModal from "./components/AuthModal";
import Dashboard from "./pages/dashboard";
import DashboardAdmin from "./pages/dashboardAdmin";
import "./App.css";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <div className="App" style={{ textAlign: "center", marginTop: "50px" }}>
      {!user ? (
        <>
          {/* Logo solo en bienvenida */}
          <img
            src="/logo.png" // Asegúrate de poner tu imagen en public/logo.png
            alt="Logo Parking Now"
            style={{ height: "100px", marginBottom: "20px" }}
          />

          {/* Título */}
          <h1>Bienvenido a Parking Now</h1>

          {/* Botón de inicio */}
          <button
            onClick={() => setShowModal(true)}
            style={{
              marginTop: "20px",
              padding: "12px 25px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              backgroundColor: "#FFD700",
              color: "#000",
              fontWeight: "bold",
            }}
          >
            Iniciar sesión / Registrarse
          </button>

          {/* Modal de autenticación */}
          {showModal && (
            <AuthModal
              onClose={() => setShowModal(false)}
              onAuthSuccess={(data) => setUser(data)} // data debe incluir rol y token
            />
          )}
        </>
      ) : (
        <>
          {/* Dashboard según rol */}
          {user.rol === "2" || user.rol === 2 ? (
            <DashboardAdmin user={user} token={user.token} onLogout={() => setUser(null)} />
          ) : (
            <Dashboard user={user} onLogout={() => setUser(null)} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
