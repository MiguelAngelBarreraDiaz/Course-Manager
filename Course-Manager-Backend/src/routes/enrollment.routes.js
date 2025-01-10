const express = require('express');
const enrollmentController = require('../controllers/enrollment.controller');

const router = express.Router();

// Rutas de matriculación
router.post('/', enrollmentController.enrollStudent);
router.get('/:id', enrollmentController.getEnrollmentById);
router.get('/user/:userId', enrollmentController.getEnrollmentsByUserId);
router.put('/:id', enrollmentController.updateEnrollment);
router.delete('/:id', enrollmentController.deleteEnrollment);

module.exports = router;