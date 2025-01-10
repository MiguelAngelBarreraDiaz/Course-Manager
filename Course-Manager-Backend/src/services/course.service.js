const { Course } = require('../models');

/**
 * Crea un nuevo curso.
 * 
 * @param {Object} courseData - Los datos del curso a crear.
 * @returns {Object} - El curso creado.
 * @throws {Error} - Si ocurre un error al crear el curso.
 */
const createCourse = async (courseData) => {
  try {
    const course = await Course.create(courseData);
    return course;
  } catch (error) {
    throw new Error('Error al crear el curso: ' + error.message);
  }
};

/**
 * Obtiene un curso por su ID.
 * 
 * @param {number} id - El ID del curso a obtener.
 * @returns {Object} - El curso encontrado.
 * @throws {Error} - Si el curso no se encuentra o si ocurre un error al obtener el curso.
 */
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

/**
 * Actualiza un curso por su ID.
 * 
 * @param {number} id - El ID del curso a actualizar.
 * @param {Object} courseData - Los nuevos datos del curso.
 * @returns {Object} - El curso actualizado.
 * @throws {Error} - Si el curso no se encuentra o si ocurre un error al actualizar el curso.
 */
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

/**
 * Elimina un curso por su ID.
 * 
 * @param {number} id - El ID del curso a eliminar.
 * @returns {Object} - Un mensaje indicando que el curso fue eliminado correctamente.
 * @throws {Error} - Si el curso no se encuentra o si ocurre un error al eliminar el curso.
 */
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