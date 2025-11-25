import React, { useEffect, useState } from "react";
import FormVehiculo from "./FormVehiculo";

const Dashboard = ({ user, onLogout }) => {
  const fechaActual = new Date().toLocaleDateString();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    document.body.style.margin = 0;
    document.body.style.padding = 0;
    document.body.style.height = "100vh";
    document.documentElement.style.height = "100vh";
    document.body.style.backgroundColor = "#000";
  }, []);

  return (
    <>
      {showForm && <FormVehiculo onClose={() => setShowForm(false)} userId={user.idPersona} />}
      
      <div
        style={{
          minHeight: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Arial, sans-serif",
          margin: 0,
          padding: 0,
        }}
      >
        {/* Navbar */}
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
            style={{ height: "100px", marginBottom: "20px" }}
          />
        </div>

        {/* Contenedor principal */}
        <div
          style={{
            display: "flex",
            flex: 1,
            height: "100%",
            overflow: "hidden",
          }}
        >
          {/* Barra lateral */}
          <aside
            style={{
              width: "260px",
              backgroundColor: "#000",
              color: "#FFD700",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "25px",
            }}
          >
            {/* Información del usuario */}
            <div>
              <h2 style={{ margin: "0 0 10px 0" }}>
                {user.nombre} {user.apellido}
              </h2>
              <div>
                <p style={{ margin: "5px 0" }}>
                  <strong>Correo:</strong> {user.correo}
                </p>
                <p style={{ margin: "5px 0" }}>
                  <strong>Último acceso:</strong> {fechaActual}
                </p>
              </div>
            </div>

            {/* Botones de la barra lateral */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                marginTop: "20px",
              }}
            >
              <button style={botonEstilo}>Perfil</button>
              <button style={botonEstilo}>Configuración</button>
              <button style={botonEstilo} onClick={onLogout}>
                Cerrar sesión
              </button>
            </div>
          </aside>

          {/* Contenido principal */}
          <main
            style={{
              flex: 1,
              backgroundColor: "#e7c311ff",
              padding: "40px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "30px",
            }}
          >
            {/* Introducción */}
            <div style={{ textAlign: "center", maxWidth: "600px" }}>
              <h2 style={{ color: "#000" }}>¡Bienvenido a Parking Now!</h2>
              <p style={{ color: "#000", fontSize: "18px" }}>
                Parking Now es tu aplicación de gestión de estacionamiento. Aquí
                puedes agendar, administrar y llevar el control de los vehículos
                que ingresan a tu parqueadero. Nuestro objetivo es ofrecerte una
                experiencia rápida, segura y organizada.
              </p>
              <p style={{ color: "#000", fontSize: "18px" }}>
                <strong>Quiénes somos:</strong> Somos un equipo comprometido con
                la eficiencia en la gestión de estacionamientos, brindando
                soluciones digitales modernas para facilitar tu día a día.
              </p>
            </div>

            {/* Tarjetas */}
            <div
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <div style={cardEstilo} onClick={() => setShowForm(true)}>
                <p>🚘</p>
                <h3>Agendar Vehículo</h3>
              </div>
              <div style={cardEstilo}>
                <p>⚖️</p>
                <h3>Políticas</h3>
              </div>
              <div style={cardEstilo}>
                <p>🕵</p>
                <h3>Privacidad</h3>
              </div>
            </div>
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
  fontSize: "15px",
  transition: "all 0.2s ease-in-out",
};

const cardEstilo = {
  backgroundColor: "#dab028ff",
  padding: "30px 40px",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  cursor: "pointer",
  textAlign: "center",
  minWidth: "180px",
  transition: "transform 0.2s",
};

export default Dashboard;
