const express = require('express');
const enrollmentController = require('../controllers/enrollment.controller');
const authenticate = require('../middleware/auth.middleware');

const router = express.Router();

// Rutas de matriculación
router.post('/', authenticate, enrollmentController.enrollStudent);
router.get('/:id', authenticate, enrollmentController.getEnrollmentById);
router.get('/user/:userId', authenticate, enrollmentController.getEnrollmentsByUserId);
router.get('/professor/:professorId', authenticate, enrollmentController.getEnrollmentsByProfessorId);
router.put('/:id', authenticate, enrollmentController.updateEnrollment);
router.delete('/:id', authenticate, enrollmentController.deleteEnrollment);

module.exports = router;