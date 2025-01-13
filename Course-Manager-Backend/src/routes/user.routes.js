const express = require('express');
const userController = require('../controllers/user.controller');
const authenticate = require('../middleware/auth.middleware');

const router = express.Router();

// Rutas de usuarios

/**
 * @route POST /users
 * @description Crea un nuevo usuario
 * @access Private
 */
router.post('/', authenticate, userController.createUser);

/**
 * @route GET /users
 * @description Obtiene todos los usuarios
 * @access Private
 */
router.get('/', authenticate, userController.getAllUsers);

/**
 * @route GET /users/:id
 * @description Obtiene un usuario por su ID
 * @access Private
 */
router.get('/:id', authenticate, userController.getUserById);

/**
 * @route PUT /users/:id
 * @description Actualiza un usuario por su ID
 * @access Private
 */
router.put('/:id', authenticate, userController.updateUser);

/**
 * @route DELETE /users/:id
 * @description Elimina un usuario por su ID
 * @access Private
 */
router.delete('/:id', authenticate, userController.deleteUser);

module.exports = router;