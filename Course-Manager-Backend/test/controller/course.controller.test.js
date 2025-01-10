const request = require('supertest');
const express = require('express');
const courseController = require('../../src/controllers/course.controller');
const courseService = require('../../src/services/course.service');

jest.mock('../../src/services/course.service');

const app = express();
app.use(express.json());
app.post('/api/courses', courseController.createCourse);
app.get('/api/courses/:id', courseController.getCourseById);
app.put('/api/courses/:id', courseController.updateCourse);
app.delete('/api/courses/:id', courseController.deleteCourse);

describe('Course Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería crear un curso', async () => {
    const courseData = { name: 'Curso de Prueba', modality_id: 1, duration: 10, quota: 20 };
    const createdCourse = { id: 1, ...courseData };
    courseService.createCourse.mockResolvedValue(createdCourse);

    const response = await request(app)
      .post('/api/courses')
      .send(courseData);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(createdCourse);
    expect(courseService.createCourse).toHaveBeenCalledWith(courseData);
  });

  it('debería obtener un curso por id', async () => {
    const course = { id: 1, name: 'Curso de Prueba', modality_id: 1, duration: 10, quota: 20 };
    courseService.getCourseById.mockResolvedValue(course);

    const response = await request(app)
      .get('/api/courses/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(course);
    expect(courseService.getCourseById).toHaveBeenCalledWith(1);
  });

  it('debería actualizar un curso', async () => {
    const course = { id: 1, name: 'Curso de Prueba', modality_id: 1, duration: 10, quota: 20 };
    const updatedCourse = { ...course, name: 'Curso Actualizado' };
    courseService.updateCourse.mockResolvedValue(updatedCourse);

    const response = await request(app)
      .put('/api/courses/1')
      .send({ name: 'Curso Actualizado' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedCourse);
    expect(courseService.updateCourse).toHaveBeenCalledWith(1, { name: 'Curso Actualizado' });
  });

  it('debería eliminar un curso', async () => {
    const message = { message: 'Curso eliminado correctamente' };
    courseService.deleteCourse.mockResolvedValue(message);

    const response = await request(app)
      .delete('/api/courses/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(message);
    expect(courseService.deleteCourse).toHaveBeenCalledWith(1);
  });
});