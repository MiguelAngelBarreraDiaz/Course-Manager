const { User } = require('../models');

const createUser = async (userData) => {
  try {
    const user = await User.create(userData);
    return user;
  } catch (error) {
    throw new Error('Error al crear el usuario: ' + error.message);
  }
};

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