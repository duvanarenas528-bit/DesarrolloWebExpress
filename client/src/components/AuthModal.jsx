// client/src/components/AuthModal.jsx
import React, { useState } from "react";

const AuthModal = ({ onClose, onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    idTipoID: "",
    nombre: "",
    apellido: "",
    correo: "",
    contraseña: "",
    idGenero: "",
  });
  const [codigo, setCodigo] = useState("");
  const [mostrarCodigo, setMostrarCodigo] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    if (!isLogin) {
      // Registro
      try {
        const res = await fetch("http://localhost:3000/api/registro", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (res.ok) {
          setMostrarCodigo(true);
          setMensaje("📩 Código enviado al correo");
        } else {
          setMensaje(data.error || data.message || "Error al registrar");
        }
      } catch (err) {
        console.error(err);
        setMensaje("Error al conectar con el servidor");
      }
      return;
    }

    // Login
    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          correo: formData.correo,
          contraseña: formData.contraseña,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje("✅ Inicio de sesión exitoso");
        // IMPORTANTE: llamar callback del padre con los datos del usuario
        // Backend debe devolver { usuario: { ... }, token: "..." }
        if (onAuthSuccess && data.usuario) {
          onAuthSuccess(data.usuario, data.token);
        } else if (onAuthSuccess && data.token) {
          // fallback si backend devuelve token + hay que pedir datos después
          onAuthSuccess({ correo: formData.correo }, data.token);
        } else {
          setMensaje("No se recibieron datos del usuario desde el servidor");
        }
      } else {
        setMensaje(data.error || data.message || "Credenciales incorrectas");
      }
    } catch (err) {
      console.error(err);
      setMensaje("Error al conectar con el servidor");
    }
  };

  const verificarCodigo = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/verificar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo: formData.correo, codigo }),
      });
      const data = await res.json();
      if (res.ok) {
        setMensaje("✅ Correo verificado. Ya puedes iniciar sesión");
        setMostrarCodigo(false);
        setIsLogin(true);
      } else {
        setMensaje(data.error || data.message || "Código incorrecto");
      }
    } catch (err) {
      console.error(err);
      setMensaje("Error al verificar código");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>✖</button>

        <h2>{isLogin ? "Iniciar Sesión" : "Registrarse"}</h2>

        {!mostrarCodigo ? (
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <input name="idTipoID" placeholder="Tipo de ID" onChange={handleChange} required />
                <input name="nombre" placeholder="Nombre" onChange={handleChange} required />
                <input name="apellido" placeholder="Apellido" onChange={handleChange} required />
                <input name="idGenero" placeholder="Género (1=M,2=F)" onChange={handleChange} required />
              </>
            )}

            <input type="email" name="correo" placeholder="Correo" onChange={handleChange} required />
            <input type="password" name="contraseña" placeholder="Contraseña" onChange={handleChange} required />

            <button type="submit" className="btn-primary">{isLogin ? "Entrar" : "Registrarse"}</button>
          </form>
        ) : (
          <div>
            <p>Ingresa el código que llegó a tu correo:</p>
            <input value={codigo} onChange={(e) => setCodigo(e.target.value)} placeholder="Código" />
            <button onClick={verificarCodigo}>Verificar</button>
          </div>
        )}

        <p>
          {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}
          <span onClick={() => { setIsLogin(!isLogin); setMostrarCodigo(false); setMensaje(""); }} style={{color:"#2563eb", cursor:"pointer"}}> {isLogin ? " Regístrate" : " Inicia sesión"}</span>
        </p>

        {mensaje && <p className="mensaje">{mensaje}</p>}
      </div>
    </div>
  );
};

export default AuthModal;