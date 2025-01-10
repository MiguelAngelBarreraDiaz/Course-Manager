const express = require('express');
const userController = require('../controllers/user.controller');
const authenticate = require('../middleware/auth.middleware');

const router = express.Router();

// Rutas de usuarios
router.post('/', authenticate,userController.createUser);
router.get('/', authenticate,userController.getAllUsers);
router.get('/:id', authenticate,userController.getUserById);
router.put('/:id', authenticate,userController.updateUser);
router.delete('/:id', authenticate,userController.deleteUser);

module.exports = router;