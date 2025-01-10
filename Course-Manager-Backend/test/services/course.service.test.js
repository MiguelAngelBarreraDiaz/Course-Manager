const { Course } = require('../../src/models');
const courseService = require('../../src/services/course.service');

// Mock de los métodos del modelo Course
jest.mock('../../src/models', () => ({
  Course: {
    create: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn()
  }
}));

describe('Servicio de Cursos', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería crear un curso', async () => {
    const courseData = {
      name: 'Curso de Prueba',
      modality_id: 1,
      duration: 10,
      quota: 20
    };
    const createdCourse = { id: 1, ...courseData };
    Course.create.mockResolvedValue(createdCourse);

    const result = await courseService.createCourse(courseData);

    expect(Course.create).toHaveBeenCalledWith(courseData);
    expect(result).toEqual(createdCourse);
  });

  it('debería obtener un curso por id', async () => {
    const course = {
      id: 1,
      name: 'Curso de Prueba',
      modality_id: 1,
      duration: 10,
      quota: 20
    };
    Course.findByPk.mockResolvedValue(course);

    const result = await courseService.getCourseById(1);

    expect(Course.findByPk).toHaveBeenCalledWith(1);
    expect(result).toEqual(course);
  });

  it('debería actualizar un curso', async () => {
    const course = {
      id: 1,
      name: 'Curso de Prueba',
      modality_id: 1,
      duration: 10,
      quota: 20,
      update: jest.fn()
    };
    const courseData = { name: 'Curso Actualizado' };
    Course.findByPk.mockResolvedValue(course);
    course.update.mockResolvedValue(course);

    const result = await courseService.updateCourse(1, courseData);

    expect(Course.findByPk).toHaveBeenCalledWith(1);
    expect(course.update).toHaveBeenCalledWith(courseData);
    expect(result).toEqual(course);
  });

  it('debería eliminar un curso', async () => {
    const course = {
      id: 1,
      name: 'Curso de Prueba',
      modality_id: 1,
      duration: 10,
      quota: 20,
      destroy: jest.fn()
    };
    Course.findByPk.mockResolvedValue(course);
    course.destroy.mockResolvedValue();

    const result = await courseService.deleteCourse(1);

    expect(Course.findByPk).toHaveBeenCalledWith(1);
    expect(course.destroy).toHaveBeenCalled();
    expect(result).toEqual({ message: 'Curso eliminado correctamente' });
  });
});