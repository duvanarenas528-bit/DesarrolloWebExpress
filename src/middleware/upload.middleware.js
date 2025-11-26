const multer = require("multer");
const path = require("path");

// Carpeta donde se guardan fotos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads"); 
  },

  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, unique + ext);
  }
});

// Validación de imagen
const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/jpg"];

  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Solo se permiten imágenes"), false);
  }
};

module.exports = multer({ storage, fileFilter });
