import React, { useState } from "react";

const AuthModal = ({ onClose, onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [mostrarCodigo, setMostrarCodigo] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const [formData, setFormData] = useState({
    idTipoID: "",
    nombre: "",
    apellido: "",
    correo: "",
    contraseña: "",
    idGenero: "",
  });

  const [codigo, setCodigo] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // 🚀 REGISTRO O LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    if (!isLogin) {
      // -----------------------------
      // 🟡 REGISTRO
      // -----------------------------
      try {
        const res = await fetch("http://localhost:3000/api/registro", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await res.json();
        console.log("RESPUESTA REGISTRO:", data);

        if (!res.ok) {
          setMensaje(data.error || data.message || "Error al registrar");
          return;
        }

        // SI TODO OK → PASAR A CÓDIGO
        setMostrarCodigo(true);
        setMensaje("📩 Se envió un código a tu correo.");

      } catch (error) {
        console.error(error);
        setMensaje("Error conectando con el servidor.");
      }

      return;
    }

    // -----------------------------
    // 🔵 LOGIN
    // -----------------------------
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
      console.log("LOGIN:", data);

      if (!res.ok) {
        setMensaje(data.error || data.message || "Credenciales incorrectas");
        return;
      }

      if (!data.usuario || !data.token) {
        setMensaje("El servidor no devolvió datos válidos");
        return;
      }

      setMensaje("Inicio de sesión exitoso");
      onAuthSuccess(data.usuario, data.token);

    } catch (err) {
      console.error(err);
      setMensaje("Error en la conexión con el servidor");
    }
  };

  // ------------------------------------
  // 🟢 VERIFICAR CÓDIGO
  // ------------------------------------
  const verificarCodigo = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/verificar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          correo: formData.correo,
          codigo,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.error || data.message || "Código incorrecto");
        return;
      }

      setMensaje("🎉 Correo verificado. Ya puedes iniciar sesión.");
      setMostrarCodigo(false);
      setIsLogin(true);

    } catch (err) {
      console.error(err);
      setMensaje("Error al verificar el código");
    }
  };

  // ------------------------------------
  // 📌 JSX
  // ------------------------------------
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
                <input name="idGenero" placeholder="Género (1=M, 2=F)" onChange={handleChange} required />
              </>
            )}

            <input type="email" name="correo" placeholder="Correo" onChange={handleChange} required />
            <input type="password" name="contraseña" placeholder="Contraseña" onChange={handleChange} required />

            <button type="submit" className="btn-primary">
              {isLogin ? "Entrar" : "Registrarse"}
            </button>
          </form>
        ) : (
          <div>
            <p>Ingresa el código enviado al correo:</p>
            <input
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              placeholder="Código"
            />
            <button onClick={verificarCodigo}>Verificar</button>
          </div>
        )}

        <p>
          {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}
          <span
            style={{ color: "#2563eb", cursor: "pointer" }}
            onClick={() => {
              setIsLogin(!isLogin);
              setMostrarCodigo(false);
              setMensaje("");
            }}
          >
            {isLogin ? " Regístrate" : " Inicia sesión"}
          </span>
        </p>

        {mensaje && <p className="mensaje">{mensaje}</p>}
      </div>
    </div>
  );
};

export default AuthModal;
