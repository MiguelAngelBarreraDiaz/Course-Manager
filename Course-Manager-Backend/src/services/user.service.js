const { User } = require('../models');

/**
 * Crea un nuevo usuario.
 * 
 * @param {Object} userData - Los datos del usuario a crear.
 * @returns {Object} - El usuario creado.
 * @throws {Error} - Si ocurre un error al crear el usuario.
 */
const createUser = async (userData) => {
  try {
    const user = await User.create(userData);
    return user;
  } catch (error) {
    throw new Error('Error al crear el usuario: ' + error.message);
  }
};

/**
 * Obtiene un usuario por su ID.
 * 
 * @param {number} id - El ID del usuario a obtener.
 * @returns {Object} - El usuario encontrado.
 * @throws {Error} - Si el usuario no se encuentra o si ocurre un error al obtener el usuario.
 */
const getUserById = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    return user;
  } catch (error) {
    throw new Error('Error al obtener el usuario: ' + error.message);
  }
};

/**
 * Actualiza un usuario por su ID.
 * 
 * @param {number} id - El ID del usuario a actualizar.
 * @param {Object} userData - Los nuevos datos del usuario.
 * @returns {Object} - El usuario actualizado.
 * @throws {Error} - Si el usuario no se encuentra o si ocurre un error al actualizar el usuario.
 */
const updateUser = async (id, userData) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    await user.update(userData);
    return user;
  } catch (error) {
    throw new Error('Error al actualizar el usuario: ' + error.message);
  }
};

/**
 * Elimina un usuario por su ID.
 * 
 * @param {number} id - El ID del usuario a eliminar.
 * @returns {Object} - Un mensaje indicando que el usuario fue eliminado correctamente.
 * @throws {Error} - Si el usuario no se encuentra o si ocurre un error al eliminar el usuario.
 */
const deleteUser = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    await user.destroy();
    return { message: 'Usuario eliminado correctamente' };
  } catch (error) {
    throw new Error('Error al eliminar el usuario: ' + error.message);
  }
};

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser
};