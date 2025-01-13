const authService = require('../services/auth.service');

/**
 * Controlador para autenticar a un usuario.
 * 
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authService.authenticateUser(email, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

/**
 * Controlador para validar el token.
 * 
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 */
const validateToken = async (req, res) => {
  const token = req.body.token || req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    const user = await authService.validateToken(token);
    res.status(200).json({ message: 'Token válido', user });
  } catch (error) {
    console.error('Error al verificar el token:', error);
    return res.status(401).json({ message: 'Token inválido', error: error.message });
  }
};


module.exports = {
  validateToken,
  login
};