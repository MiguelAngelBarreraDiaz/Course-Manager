const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();

// Ruta de autenticación
router.post('/login', authController.login);

module.exports = router;