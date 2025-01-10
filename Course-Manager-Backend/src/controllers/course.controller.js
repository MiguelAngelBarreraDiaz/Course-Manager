const courseService = require('../services/course.service');

/**
 * Controlador para crear un nuevo curso.
 * 
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 */
const createCourse = async (req, res) => {
  try {
    const course = await courseService.createCourse(req.body);
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Controlador para obtener un curso por su ID.
 * 
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 */
const getCourseById = async (req, res) => {
  try {
    const course = await courseService.getCourseById(Number(req.params.id));
    res.status(200).json(course);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * Controlador para actualizar un curso por su ID.
 * 
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 */
const updateCourse = async (req, res) => {
  try {
    const course = await courseService.updateCourse(Number(req.params.id), req.body);
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Controlador para eliminar un curso por su ID.
 * 
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 */
const deleteCourse = async (req, res) => {
  try {
    const result = await courseService.deleteCourse(Number(req.params.id));
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCourse,
  getCourseById,
  updateCourse,
  deleteCourse
};