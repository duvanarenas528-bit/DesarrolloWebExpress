const express = require("express");
const router = express.Router();
const vehiculosController = require("../controller/vehiculos.controller");
const { verifyToken } = require("../middleware/auth.middleware");

router.get("/", verifyToken, vehiculosController.findAll);
router.post("/", verifyToken, vehiculosController.create);
router.get("/:id", verifyToken, vehiculosController.findById);
router.put("/:id", verifyToken, vehiculosController.update);
router.delete("/:id", verifyToken, vehiculosController.remove);

module.exports = router;
