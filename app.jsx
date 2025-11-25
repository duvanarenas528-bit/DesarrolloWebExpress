import React, { useState } from "react";
import AuthModal from "./components/AuthModal";
import DashboardUser from "./pages/dashboard";
import DashboardAdmin from "./pages/dashboardAdmin";
import "./App.css";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  const handleAuthSuccess = (usuario, token) => {
    setUser(usuario);
    setToken(token);
    localStorage.setItem("token", token);
  };

  const handleLogout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <div className="App" style={{ textAlign: "center", marginTop: "50px" }}>
      {!user ? (
        <>
          <img
            src="/logo.png"
            alt="Logo Parking Now"
            style={{ height: "100px", marginBottom: "20px" }}
          />

          <h1>Bienvenido a Parking Now</h1>

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

          {showModal && (
            <AuthModal
              onClose={() => setShowModal(false)}
              onAuthSuccess={handleAuthSuccess}
            />
          )}
        </>
      ) : (
        <>
          {user.rol === 2 ? (
            <DashboardAdmin user={user} token={token} onLogout={handleLogout} />
          ) : (
            <DashboardUser user={user} onLogout={handleLogout} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
