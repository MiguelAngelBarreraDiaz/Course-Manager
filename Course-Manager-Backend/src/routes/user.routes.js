const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

// Rutas de usuarios
router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;