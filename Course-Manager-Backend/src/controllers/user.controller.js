const userService = require('../services/user.service');

/**
 * Controlador para crear un nuevo usuario.
 * 
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 */
const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Controlador para obtener todos los usuarios.
 * 
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Controlador para obtener un usuario por su ID.
 * 
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 */
const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(Number(req.params.id));
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * Controlador para actualizar un usuario por su ID.
 * 
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 */
const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(Number(req.params.id), req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Controlador para eliminar un usuario por su ID.
 * 
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 */
const deleteUser = async (req, res) => {
  try {
    const result = await userService.deleteUser(Number(req.params.id));
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};