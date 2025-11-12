const nodemailer = require("nodemailer");

exports.enviarCodigo = async (correo, codigo) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"ParkingNow 🚗" <${process.env.EMAIL_USER}>`,
      to: correo,
      subject: "Código de verificación - ParkingNow",
      html: `
        <h2>¡Bienvenido a ParkingNow!</h2>
        <p>Tu código de verificación es:</p>
        <h1 style="color:#2e86de;">${codigo}</h1>
        <p>Por favor ingrésalo en la aplicación para activar tu cuenta.</p>
        <br>
        <p>Equipo ParkingNow 🚙</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Correo de verificación enviado a:", correo);
  } catch (error) {
    console.error("❌ Error al enviar correo:", error);
    throw new Error("No se pudo enviar el correo de verificación");
  }
};
