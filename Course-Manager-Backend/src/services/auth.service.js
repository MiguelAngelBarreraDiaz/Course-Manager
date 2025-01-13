const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');

const secret = process.env.JWT_SECRET || 'C0IPMDPiGV';

/**
 * Genera un token JWT para un usuario.
 * 
 * @param {Object} user - El usuario para el cual generar el token.
 * @returns {string} - El token JWT.
 */
const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: '1h' });
};

/**
 * Autentica a un usuario por correo y contraseña.
 * 
 * @param {string} email - El correo del usuario.
 * @param {string} password - La contraseña del usuario.
 * @returns {string} - El token JWT.
 * @throws {Error} - Si la autenticación falla.
 */
const authenticateUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Contraseña incorrecta');
  }

  return generateToken(user);
};

/**
 * Valida un token JWT.
 * 
 * @param {string} token - El token JWT a validar.
 * @returns {Object} - El usuario decodificado.
 * @throws {Error} - Si el token no es válido.
 */
const validateToken = async (token) => {
  try {
    const decoded = jwt.verify(token, secret);
    const user = await User.findByPk(decoded.id);
    if (!user) {
      throw new Error('Token inválido');
    }
    return user;
  } catch (error) {
    throw new Error('Token inválido: ' + error.message);
  }
};

module.exports = {
  generateToken,
  authenticateUser,
  validateToken
};