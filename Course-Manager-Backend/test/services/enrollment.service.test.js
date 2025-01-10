const { User, Course, UserCourse } = require('../../src/models');
const enrollmentService = require('../../src/services/enrollment.service');

// Mock de los métodos de los modelos
jest.mock('../../src/models', () => ({
  User: {
    create: jest.fn(),
    findByPk: jest.fn()
  },
  Course: {
    create: jest.fn(),
    findByPk: jest.fn()
  },
  UserCourse: {
    create: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn()
  }
}));

describe('Servicio de Matriculación', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería matricular a un estudiante', async () => {
    const userData = { id: 1, first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com' };
    const courseData = { id: 2, name: 'Curso de Prueba' };
    const enrollmentData = { user_id: 1, course_id: 2, inscription_status_id: 3 };
    const createdEnrollment = { id: 1, ...enrollmentData };

    User.create.mockResolvedValue(userData);
    Course.create.mockResolvedValue(courseData);
    UserCourse.create.mockResolvedValue(createdEnrollment);

    // Crear usuario
    const user = await User.create(userData);
    expect(User.create).toHaveBeenCalledWith(userData);
    expect(user).toEqual(userData);

    // Crear curso
    const course = await Course.create(courseData);
    expect(Course.create).toHaveBeenCalledWith(courseData);
    expect(course).toEqual(courseData);

    // Matricular estudiante
    const result = await enrollmentService.enrollStudent(enrollmentData);
    expect(UserCourse.create).toHaveBeenCalledWith(enrollmentData);
    expect(result).toEqual(createdEnrollment);
  });

  it('debería obtener una matrícula por id', async () => {
    const enrollment = { id: 1, user_id: 1, course_id: 2, inscription_status_id: 3 };
    UserCourse.findByPk.mockResolvedValue(enrollment);

    const result = await enrollmentService.getEnrollmentById(1);

    expect(UserCourse.findByPk).toHaveBeenCalledWith(1);
    expect(result).toEqual(enrollment);
  });

  it('debería actualizar una matrícula', async () => {
    const enrollment = { id: 1, user_id: 1, course_id: 2, inscription_status_id: 3, update: jest.fn() };
    const enrollmentData = { inscription_status_id: 4 };
    UserCourse.findByPk.mockResolvedValue(enrollment);
    enrollment.update.mockResolvedValue(enrollment);

    const result = await enrollmentService.updateEnrollment(1, enrollmentData);

    expect(UserCourse.findByPk).toHaveBeenCalledWith(1);
    expect(enrollment.update).toHaveBeenCalledWith(enrollmentData);
    expect(result).toEqual(enrollment);
  });

  it('debería eliminar una matrícula', async () => {
    const enrollment = { id: 1, user_id: 1, course_id: 2, inscription_status_id: 3, destroy: jest.fn() };
    UserCourse.findByPk.mockResolvedValue(enrollment);
    enrollment.destroy.mockResolvedValue();

    const result = await enrollmentService.deleteEnrollment(1);

    expect(UserCourse.findByPk).toHaveBeenCalledWith(1);
    expect(enrollment.destroy).toHaveBeenCalled();
    expect(result).toEqual({ message: 'Matrícula eliminada correctamente' });
  });
});