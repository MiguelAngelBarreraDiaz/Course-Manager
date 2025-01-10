const { Course } = require('../models');

const createCourse = async (courseData) => {
  try {
    const course = await Course.create(courseData);
    return course;
  } catch (error) {
    throw new Error('Error al crear el curso: ' + error.message);
  }
};

const getCourseById = async (id) => {
  try {
    const course = await Course.findByPk(id);
    if (!course) {
      throw new Error('Curso no encontrado');
    }
    return course;
  } catch (error) {
    throw new Error('Error al obtener el curso: ' + error.message);
  }
};

const updateCourse = async (id, courseData) => {
  try {
    const course = await Course.findByPk(id);
    if (!course) {
      throw new Error('Curso no encontrado');
    }
    await course.update(courseData);
    return course;
  } catch (error) {
    throw new Error('Error al actualizar el curso: ' + error.message);
  }
};

const deleteCourse = async (id) => {
  try {
    const course = await Course.findByPk(id);
    if (!course) {
      throw new Error('Curso no encontrado');
    }
    await course.destroy();
    return { message: 'Curso eliminado correctamente' };
  } catch (error) {
    throw new Error('Error al eliminar el curso: ' + error.message);
  }
};

module.exports = {
  createCourse,
  getCourseById,
  updateCourse,
  deleteCourse
};