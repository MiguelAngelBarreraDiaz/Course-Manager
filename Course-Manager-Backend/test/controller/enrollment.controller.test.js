const request = require('supertest');
const express = require('express');
const enrollmentController = require('../../src/controllers/enrollment.controller');
const enrollmentService = require('../../src/services/enrollment.service');

jest.mock('../../src/services/enrollment.service');

const app = express();
app.use(express.json());
app.post('/api/enrollments', enrollmentController.enrollStudent);
app.get('/api/enrollments/:id', enrollmentController.getEnrollmentById);
app.put('/api/enrollments/:id', enrollmentController.updateEnrollment);
app.delete('/api/enrollments/:id', enrollmentController.deleteEnrollment);

describe('Enrollment Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería matricular a un estudiante', async () => {
    const enrollmentData = { user_id: 1, course_id: 2, inscription_status_id: 3 };
    const createdEnrollment = { id: 1, ...enrollmentData };
    enrollmentService.enrollStudent.mockResolvedValue(createdEnrollment);

    const response = await request(app)
      .post('/api/enrollments')
      .send(enrollmentData);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(createdEnrollment);
    expect(enrollmentService.enrollStudent).toHaveBeenCalledWith(enrollmentData);
  });

  it('debería obtener una matrícula por id', async () => {
    const enrollment = { id: 1, user_id: 1, course_id: 2, inscription_status_id: 3 };
    enrollmentService.getEnrollmentById.mockResolvedValue(enrollment);

    const response = await request(app)
      .get('/api/enrollments/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(enrollment);
    expect(enrollmentService.getEnrollmentById).toHaveBeenCalledWith(1);
  });

  it('debería actualizar una matrícula', async () => {
    const enrollment = { id: 1, user_id: 1, course_id: 2, inscription_status_id: 3 };
    const updatedEnrollment = { ...enrollment, inscription_status_id: 4 };
    enrollmentService.updateEnrollment.mockResolvedValue(updatedEnrollment);

    const response = await request(app)
      .put('/api/enrollments/1')
      .send({ inscription_status_id: 4 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedEnrollment);
    expect(enrollmentService.updateEnrollment).toHaveBeenCalledWith(1, { inscription_status_id: 4 });
  });

  it('debería eliminar una matrícula', async () => {
    const message = { message: 'Matrícula eliminada correctamente' };
    enrollmentService.deleteEnrollment.mockResolvedValue(message);

    const response = await request(app)
      .delete('/api/enrollments/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(message);
    expect(enrollmentService.deleteEnrollment).toHaveBeenCalledWith(1);
  });
});