import React, { useState } from "react";
import AuthModal from "./components/AuthModal";
import Dashboard from "./pages/dashboard";
import "./App.css";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      {!user ? (
        <>
          <h1>🚗 Bienvenido a Parking Now 🚗</h1>
          <button onClick={() => setShowModal(true)}>
            Iniciar sesión / Registrarse
          </button>

          {showModal && (
            <AuthModal
              onClose={() => setShowModal(false)}
              onAuthSuccess={(data) => setUser(data)}
            />
          )}
        </>
      ) : (
        <Dashboard user={user} />
      )}
    </div>
  );
}

export default App;