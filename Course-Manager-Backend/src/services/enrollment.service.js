const { UserCourse } = require('../models');

const enrollStudent = async (enrollmentData) => {
  try {
    const enrollment = await UserCourse.create(enrollmentData);
    return enrollment;
  } catch (error) {
    throw new Error('Error al matricular al estudiante: ' + error.message);
  }
};

const getEnrollmentById = async (id) => {
  try {
    const enrollment = await UserCourse.findByPk(id);
    if (!enrollment) {
      throw new Error('Matrícula no encontrada');
    }
    return enrollment;
  } catch (error) {
    throw new Error('Error al obtener la matrícula: ' + error.message);
  }
};

const updateEnrollment = async (id, enrollmentData) => {
  try {
    const enrollment = await UserCourse.findByPk(id);
    if (!enrollment) {
      throw new Error('Matrícula no encontrada');
    }
    await enrollment.update(enrollmentData);
    return enrollment;
  } catch (error) {
    throw new Error('Error al actualizar la matrícula: ' + error.message);
  }
};

const deleteEnrollment = async (id) => {
  try {
    const enrollment = await UserCourse.findByPk(id);
    if (!enrollment) {
      throw new Error('Matrícula no encontrada');
    }
    await enrollment.destroy();
    return { message: 'Matrícula eliminada correctamente' };
  } catch (error) {
    throw new Error('Error al eliminar la matrícula: ' + error.message);
  }
};

module.exports = {
  enrollStudent,
  getEnrollmentById,
  updateEnrollment,
  deleteEnrollment
};