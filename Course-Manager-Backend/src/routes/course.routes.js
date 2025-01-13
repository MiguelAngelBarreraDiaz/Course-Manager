const express = require('express');
const courseController = require('../controllers/course.controller');
const authenticate = require('../middleware/auth.middleware');

const router = express.Router();

// Rutas de cursos

/**
 * @route POST /courses
 * @description Crea un nuevo curso
 * @access Private
 */
router.post('/', authenticate, courseController.createCourse);

/**
 * @route GET /courses/:id
 * @description Obtiene un curso por su ID
 * @access Private
 */
router.get('/:id', authenticate, courseController.getCourseById);

/**
 * @route PUT /courses/:id
 * @description Actualiza un curso por su ID
 * @access Private
 */
router.put('/:id', authenticate, courseController.updateCourse);

/**
 * @route DELETE /courses/:id
 * @description Elimina un curso por su ID
 * @access Private
 */
router.delete('/:id', authenticate, courseController.deleteCourse);

/**
 * @route GET /courses
 * @description Obtiene todos los cursos
 * @access Private
 */
router.get('/', authenticate, courseController.getAllCourses);

/**
 * @route GET /courses/:id/students
 * @description Obtiene todos los estudiantes matriculados en un curso por su ID
 * @access Private
 */
router.get('/:id/students', authenticate, courseController.getStudentsByCourseId);

module.exports = router;