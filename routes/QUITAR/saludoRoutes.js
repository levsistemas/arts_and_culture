const express = require('express');
const router = express.Router();
const saludoController = require('../controller/saludoController')

// basado en los HTTP Methods https://developer.mozilla.org/es/docs/Web/HTTP/Methods
router.get("/", saludoController.MiSaludo);

module.exports = router;
