import React, { useState, useEffect } from "react";
import AuthModal from "./components/AuthModal";
import Dashboard from "./pages/dashboard";
import DashboardAdmin from "./pages/dashboardAdmin";
import HomePublic from "./pages/HomePublic";
import "./App.css";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [modoInvitado, setModoInvitado] = useState(
    localStorage.getItem("modoInvitado") === "true"
  );

  // Cargar sesión si existe
  useEffect(() => {
    const savedUser = localStorage.getItem("usuario");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Guardar modo invitado
  useEffect(() => {
    localStorage.setItem("modoInvitado", modoInvitado);
  }, [modoInvitado]);

  const handleAuthSuccess = (usuario, tokenRecibido) => {
    setUser(usuario);
    setToken(tokenRecibido);

    localStorage.setItem("usuario", JSON.stringify(usuario));
    localStorage.setItem("token", tokenRecibido);
    localStorage.removeItem("modoInvitado"); // 🔥 salir del modo invitado
    setModoInvitado(false);

    setShowModal(false);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    setModoInvitado(false);
    localStorage.removeItem("modoInvitado");
  };

  // 🔥 Mostrar HomePublic si es invitado
  if (modoInvitado && !user) {
    return <HomePublic onVolver={() => setModoInvitado(false)} />;
  }

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

          {/* 🔥 BOTÓN DE INVITADO QUE HACÍA FALTA */}
          <button
            onClick={() => setModoInvitado(true)}
            style={{
              marginTop: "20px",
              padding: "12px 25px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "2px solid #FFD700",
              cursor: "pointer",
              backgroundColor: "black",
              color: "#FFD700",
              fontWeight: "bold",
              marginRight: "10px",
            }}
          >
            Explorar como invitado 👀
          </button>

          {/* BOTÓN LOGIN */}
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
          {user.rol === "2" || user.rol === 2 ? (
            <DashboardAdmin user={user} token={token} onLogout={handleLogout} />
          ) : (
            <Dashboard user={user} token={token} onLogout={handleLogout} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
