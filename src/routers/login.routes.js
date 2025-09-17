// src/routers/login.routes.js
const express = require('express');
const router = express.Router();
const loginController = require('../controller/login.controller');

router.post('/', loginController.login);

module.exports = router;
