const express = require('express');
const enrollmentController = require('../controllers/enrollment.controller');
const authenticate = require('../middleware/auth.middleware');

const router = express.Router();

// Rutas de matriculación

/**
 * @route POST /enrollments
 * @description Matricula a un estudiante en un curso
 * @access Private
 */
router.post('/', authenticate, enrollmentController.enrollStudent);

/**
 * @route GET /enrollments/:id
 * @description Obtiene una matrícula por su ID
 * @access Private
 */
router.get('/:id', authenticate, enrollmentController.getEnrollmentById);

/**
 * @route GET /enrollments/user/:userId
 * @description Obtiene todas las matrículas de un usuario por su ID
 * @access Private
 */
router.get('/user/:userId', authenticate, enrollmentController.getEnrollmentsByUserId);

/**
 * @route GET /enrollments/professor/:professorId
 * @description Obtiene todas las matrículas de un profesor por su ID
 * @access Private
 */
router.get('/professor/:professorId', authenticate, enrollmentController.getEnrollmentsByProfessorId);

/**
 * @route PUT /enrollments/:id
 * @description Actualiza una matrícula por su ID
 * @access Private
 */
router.put('/:id', authenticate, enrollmentController.updateEnrollment);

/**
 * @route DELETE /enrollments/:id
 * @description Elimina una matrícula por su ID
 * @access Private
 */
router.delete('/:id', authenticate, enrollmentController.deleteEnrollment);

module.exports = router;