import React, { useState } from "react";

const Perfil = ({ user, token, onUserUpdate }) => {
  const [form, setForm] = useState({
    nombre: user.Nombre,
    apellido: user.Apellido,
    correo: user.correo,
  });

  const [pass, setPass] = useState({
    actual: "",
    nueva: ""
  });

  const [mensaje, setMensaje] = useState(null);
  const [previewFoto, setPreviewFoto] = useState(
    user.foto ? `http://localhost:3000/uploads/${user.foto}` : "/default-avatar.png"
  );

  // ==========================
  //    MANEJAR INPUTS
  // ==========================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleChangePass = (e) => {
    setPass({ ...pass, [e.target.name]: e.target.value });
  };

  // ==========================
  //   ACTUALIZAR DATOS
  // ==========================
  const actualizarDatos = async () => {
    setMensaje(null);

    const res = await fetch(`http://localhost:3000/api/usuarios/${user.idPersona}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (!res.ok) {
      setMensaje({ tipo: "error", texto: data.message || "Error al actualizar." });
      return;
    }

    // Actualizar en el padre si lo mandan
    if (onUserUpdate) {
      onUserUpdate({
        ...user,
        Nombre: form.nombre,
        Apellido: form.apellido,
        correo: form.correo,
      });
    }

    setMensaje({ tipo: "ok", texto: "Datos actualizados correctamente" });
  };

  // ==========================
  //   CAMBIAR CONTRASEÑA
  // ==========================
  const cambiarPassword = async () => {
    setMensaje(null);

    const res = await fetch(`http://localhost:3000/api/usuarios/cambiar-password/${user.idPersona}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(pass)
    });

    const data = await res.json();

    if (!res.ok) {
      setMensaje({ tipo: "error", texto: data.message || "Error al cambiar contraseña." });
      return;
    }

    setMensaje({ tipo: "ok", texto: "Contraseña cambiada correctamente" });
    setPass({ actual: "", nueva: "" });
  };

  // ==========================
  //     SUBIR FOTO PERFIL
  // ==========================
  const subirFoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Para previsualizar
    setPreviewFoto(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("foto", file);

    try {
      const res = await fetch(
        `http://localhost:3000/api/usuarios/foto/${user.idPersona}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMensaje({ tipo: "error", texto: data.message || "Error al subir foto." });
        return;
      }

      // Actualizar en el padre
      if (onUserUpdate) {
        onUserUpdate({ ...user, foto: data.foto });
      }

      setMensaje({ tipo: "ok", texto: "Foto actualizada correctamente" });

    } catch (err) {
      console.error(err);
      setMensaje({ tipo: "error", texto: "Error al subir la foto." });
    }
  };

  return (
    <div style={{ maxHeight: "90vh", overflowY: "auto", padding: "20px", width: "100%" }}>
      <h1 style={{ textAlign: "center" }}>Mi Perfil</h1>

      {mensaje && (
        <div
          style={{
            background: mensaje.tipo === "error" ? "#000" : "#4CAF50",
            color: "#FFD700",
            padding: "10px",
            marginBottom: "20px",
            textAlign: "center",
            borderRadius: "6px",
          }}
        >
          {mensaje.texto}
        </div>
      )}

      {/* FOTO DE PERFIL */}
      <div style={{ textAlign: "center", marginBottom: "25px" }}>
        <img
          src={previewFoto}
          alt="Foto de perfil"
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "4px solid black",
          }}
        />
        <div style={{ marginTop: "15px" }}>
          <input type="file" accept="image/*" onChange={subirFoto} />
        </div>
      </div>

      {/* DATOS PERSONALES */}
      <div style={box}>
        <h2 style={title}>Datos Personales</h2>

        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          style={input}
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={form.apellido}
          onChange={handleChange}
          style={input}
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo"
          value={form.correo}
          onChange={handleChange}
          style={input}
        />

        <button onClick={actualizarDatos} style={btn}>
          Guardar Cambios
        </button>
      </div>

      {/* CAMBIAR CONTRASEÑA */}
      <div style={box}>
        <h2 style={title}>Cambiar Contraseña</h2>

        <input
          type="password"
          name="actual"
          placeholder="Contraseña actual"
          value={pass.actual}
          onChange={handleChangePass}
          style={input}
        />
        <input
          type="password"
          name="nueva"
          placeholder="Nueva contraseña"
          value={pass.nueva}
          onChange={handleChangePass}
          style={input}
        />

        <button onClick={cambiarPassword} style={btn}>
          Actualizar Contraseña
        </button>
      </div>
    </div>
  );
};

// ===== ESTILOS =====
const box = {
  background: "#f1dc6d",
  padding: "20px",
  borderRadius: "12px",
  marginBottom: "30px",
};

const title = {
  textAlign: "center",
  marginBottom: "20px",
};

const input = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #000",
};

const btn = {
  width: "100%",
  padding: "15px",
  background: "#000",
  color: "#FFD700",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default Perfil;
