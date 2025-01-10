const express = require('express');
const courseController = require('../controllers/course.controller');

const router = express.Router();

// Rutas de cursos
router.post('/', courseController.createCourse);
router.get('/:id', courseController.getCourseById);
router.put('/:id', courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse);

module.exports = router;