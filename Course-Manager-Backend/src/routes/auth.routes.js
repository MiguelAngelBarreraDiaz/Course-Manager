const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();

// Rutas de autenticación

/**
 * @route POST /auth/login
 * @description Inicia sesión y genera un token JWT
 * @access Public
 */
router.post('/login', authController.login);

/**
 * @route POST /auth/validate-token
 * @description Valida un token JWT
 * @access Public
 */
router.post('/validate-token', authController.validateToken);

module.exports = router;