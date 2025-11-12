import React, { useState } from "react";

const AuthModal = () => {
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
  const [usuario, setUsuario] = useState(null); // 🟢 Guarda el usuario al iniciar sesión

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
          setMensaje("Código enviado al correo. Verifica tu bandeja 📩");
        } else {
          setMensaje(data.error || "Error al registrar");
        }
      } catch (error) {
        setMensaje("Error al conectar con el servidor");
      }
    } else {
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
          setMensaje("Inicio de sesión exitoso 🎉");
          setUsuario(data); // 🟢 Guarda los datos del usuario logueado
        } else {
          setMensaje(data.error || "Credenciales incorrectas");
        }
      } catch (error) {
        setMensaje("Error al conectar con el servidor");
      }
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
        setMensaje("Correo verificado ✅. Ya puedes iniciar sesión");
        setMostrarCodigo(false);
        setIsLogin(true);
      } else {
        setMensaje(data.error || "Código incorrecto ❌");
      }
    } catch (error) {
      setMensaje("Error al verificar código");
    }
  };

  // 🟢 Si el usuario ya inició sesión, muestra el dashboard
  if (usuario) {
    return (
      <div className="dashboard">
        <h2>Bienvenido, {usuario.nombre || formData.correo} 👋</h2>
        <p>Has iniciado sesión correctamente.</p>
        <p>Este es tu panel de bienvenida.</p>

        <div style={{ marginTop: "20px" }}>
          <button
            onClick={() => setUsuario(null)}
            style={{
              backgroundColor: "#ef4444",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    );
  }

  // 🟣 Si no ha iniciado sesión, muestra login/registro
  return (
    <div className="auth-modal">
      <h2>{isLogin ? "Iniciar Sesión" : "Registrarse"}</h2>

      {!mostrarCodigo ? (
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                type="text"
                name="idTipoID"
                placeholder="Tipo de ID"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="apellido"
                placeholder="Apellido"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="idGenero"
                placeholder="Género (1=M,2=F)"
                onChange={handleChange}
                required
              />
            </>
          )}

          <input
            type="email"
            name="correo"
            placeholder="Correo electrónico"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="contraseña"
            placeholder="Contraseña"
            onChange={handleChange}
            required
          />

          <button type="submit">{isLogin ? "Entrar" : "Registrarse"}</button>
        </form>
      ) : (
        <div>
          <p>Ingresa el código que llegó a tu correo:</p>
          <input
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="Código de verificación"
          />
          <button onClick={verificarCodigo}>Verificar</button>
        </div>
      )}

      <p style={{ marginTop: "10px", color: "gray" }}>
        {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
        <span
          style={{ color: "#2563eb", cursor: "pointer" }}
          onClick={() => {
            setIsLogin(!isLogin);
            setMostrarCodigo(false);
            setMensaje("");
          }}
        >
          {isLogin ? "Regístrate" : "Inicia sesión"}
        </span>
      </p>

      {mensaje && <p style={{ color: "#2563eb", marginTop: "10px" }}>{mensaje}</p>}
    </div>
  );
};

export default AuthModal;
