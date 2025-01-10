const express = require('express');
const courseController = require('../controllers/course.controller');
const authenticate = require('../middleware/auth.middleware');

const router = express.Router();

// Rutas de cursos
router.post('/', authenticate,courseController.createCourse);
router.get('/:id',authenticate, courseController.getCourseById);
router.put('/:id', authenticate,courseController.updateCourse);
router.delete('/:id',authenticate, courseController.deleteCourse);

module.exports = router;