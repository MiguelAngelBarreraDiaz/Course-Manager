const enrollmentService = require('../services/enrollment.service');

/**
 * Controlador para matricular a un estudiante en un curso.
 * 
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 */
const enrollStudent = async (req, res) => {
  try {
    const enrollment = await enrollmentService.enrollStudent(req.body);
    res.status(201).json(enrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Controlador para obtener una matrícula por su ID.
 * 
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 */
const getEnrollmentById = async (req, res) => {
  try {
    const enrollment = await enrollmentService.getEnrollmentById(Number(req.params.id));
    res.status(200).json(enrollment);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * Controlador para actualizar una matrícula por su ID.
 * 
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 */
const updateEnrollment = async (req, res) => {
  try {
    const enrollment = await enrollmentService.updateEnrollment(Number(req.params.id), req.body);
    res.status(200).json(enrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Controlador para eliminar una matrícula por su ID.
 * 
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 */
const deleteEnrollment = async (req, res) => {
  try {
    const result = await enrollmentService.deleteEnrollment(Number(req.params.id));
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Controlador para obtener todas las matrículas por `user_id`.
 * 
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 */
const getEnrollmentsByUserId = async (req, res) => {
  try {
    const enrollments = await enrollmentService.getEnrollmentsByUserId(Number(req.params.userId));
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  enrollStudent,
  getEnrollmentById,
  getEnrollmentsByUserId,
  updateEnrollment,
  deleteEnrollment
};