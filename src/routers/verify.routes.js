// src/routers/verify.routes.js
const express = require("express");
const router = express.Router();
const verifyController = require("../controller/verify.controller");

router.post("/verificar", verifyController.verifyCode);

module.exports = router;
