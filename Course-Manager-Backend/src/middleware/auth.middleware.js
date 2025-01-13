const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = process.env.JWT_SECRET || 'C0IPMDPiGV';

/**
 * Middleware de autenticación para proteger rutas.
 * 
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @param {Function} next - La función para pasar al siguiente middleware.
 */
const authenticate = async (req, res, next) => {
  const token = req.headers['authorization'];
  console.log("ESTE ES EL TOKEN");
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = await User.findByPk(decoded.id);
    next();
  } catch (error) {
    console.error('Error al verificar el token:', error);
    return res.status(401).json({ message: 'Token inválido' });
  }
};

module.exports = authenticate;