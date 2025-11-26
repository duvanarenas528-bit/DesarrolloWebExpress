import React, { useEffect, useState } from "react";
import FormVehiculo from "./FormVehiculo";
import MisAgendamientos from "./MisAgendamientos";
import Perfil from "./Perfil";

const Dashboard = ({ user, token, onLogout }) => {
  const fechaActual = new Date().toLocaleDateString();

  const [showForm, setShowForm] = useState(false);
  const [view, setView] = useState("inicio");

  const [userData, setUserData] = useState(user);

  useEffect(() => {
    // Permitir scroll normal del body
    document.body.style.overflow = "auto";
  }, []);

  return (
    <>
      {showForm && (
        <FormVehiculo
          onClose={() => setShowForm(false)}
          userId={userData.idPersona}
          token={token}
        />
      )}

      {/* CONTENEDOR PRINCIPAL */}
      <div
        style={{
          minHeight: "100vh", // <-- PERMITE CRECER, NO CORTA NADA
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#000",
        }}
      >
        {/* NAVBAR */}
        <div
          style={{
            width: "100%",
            backgroundColor: "#0e0e0dff",
            color: "#FFD700",
            padding: "20px",
            fontSize: "24px",
            fontWeight: "bold",
            textAlign: "center",
            boxShadow: "0px 2px 5px rgba(0,0,0,0.3)",
          }}
        >
          <img
            src="/logo.png"
            alt="Logo Parking Now"
            style={{ height: "100px", marginBottom: "10px" }}
          />
        </div>

        {/* CONTENIDO PRINCIPAL */}
        <div
          style={{
            display: "flex",
            flex: 1,
            overflow: "auto",
          }}
        >
          {/* SIDEBAR */}
          <aside
            style={{
              width: "260px",
              backgroundColor: "#000",
              color: "#FFD700",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "20px",
              height: "100%",
            }}
          >
            <div>
              <img
                src={
                  userData.foto
                    ? `http://localhost:3000/uploads/${userData.foto}`
                    : "/default-avatar.png"
                }
                alt="Foto perfil"
                style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "3px solid #FFD700",
                  marginBottom: "15px",
                }}
              />

              <h2 style={{ margin: "0 0 10px 0" }}>
                {userData.Nombre} {userData.Apellido}
              </h2>
              <p><strong>Correo:</strong> {userData.correo}</p>
              <p><strong>Último acceso:</strong> {fechaActual}</p>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                marginTop: "20px",
              }}
            >
              <button style={botonEstilo} onClick={() => setView("inicio")}>
                Inicio
              </button>

              <button style={botonEstilo} onClick={() => setView("agendamientos")}>
                Mis Agendamientos
              </button>

              <button style={botonEstilo} onClick={() => setView("perfil")}>
                Perfil
              </button>

              <button style={botonEstilo} onClick={onLogout}>
                Cerrar sesión
              </button>
            </div>
          </aside>

          {/* MAIN CONTENT — SCROLL REAL */}
          <main
            style={{
              flex: 1,
              backgroundColor: "#e7c311ff",
              padding: "40px",
              overflowY: "auto",  // <-- SCROLL SUAVE 
              maxHeight: "200%",   // <-- NO SE CORTA
            }}
          >
            {view === "inicio" && (
              <>
                <h2 style={{ color: "#000" }}>¡Bienvenido a Parking Now!</h2>

                <div style={{ display: "flex", gap: "20px" }}>
                  <div style={cardEstilo} onClick={() => setShowForm(true)}>
                    <p style={{ fontSize: "40px" }}>🚘</p>
                    <h3>Agendar Vehículo</h3>
                  </div>

                  <div style={cardEstilo} onClick={() => setView("agendamientos")}>
                    <p style={{ fontSize: "40px" }}>📋</p>
                    <h3>Mis Agendamientos</h3>
                  </div>
                </div>
              </>
            )}

            {view === "agendamientos" && (
              <MisAgendamientos userId={userData.idPersona} token={token} />
            )}

            {view === "perfil" && (
              <Perfil user={userData} token={token} onUserUpdate={setUserData} />
            )}
          </main>
        </div>
      </div>
    </>
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
};

const cardEstilo = {
  backgroundColor: "#dab028ff",
  padding: "30px 40px",
  borderRadius: "10px",
  cursor: "pointer",
  minWidth: "180px",
  textAlign: "center",
  transition: "0.2s",
};

export default Dashboard;
