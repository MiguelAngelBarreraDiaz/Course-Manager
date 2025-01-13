const { Sequelize, Op } = require('sequelize');
const { Course, User, UserCourse } = require('../models');


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

/**
 * Obtiene todos los cursos.
 * 
 * @returns {Array} - La lista de todos los cursos.
 * @throws {Error} - Si ocurre un error al obtener los cursos.
 */
const getAllCourses = async () => {
  try {
    const courses = await Course.findAll();
    return courses;
  } catch (error) {
    throw new Error('Error al obtener los cursos: ' + error.message);
  }
};


/**
 * Obtiene todos los estudiantes matriculados en un curso por su ID.
 * 
 * @param {number} courseId - El ID del curso.
 * @returns {Array} - La lista de estudiantes matriculados en el curso.
 * @throws {Error} - Si ocurre un error al obtener los estudiantes.
 */
const getStudentsByCourseId = async (courseId) => {
  try {
    const students = await UserCourse.findAll({
      where: { course_id: courseId },
      include: [
        {
          model: User,
          as: 'user',
          where: { role_id: [2, 3, 4] }, // Filtrar por roles
          attributes: { exclude: ['password', 'updated_at'] } // Excluir campos no necesarios
        }
      ]
    });

    // Mapear datos para incluir `id` de `UserCourse` y otros campos necesarios
    return students.map(enrollment => ({
      id: enrollment.user.id, // ID del usuario
      first_name: enrollment.user.first_name,
      last_name: enrollment.user.last_name,
      email: enrollment.user.email,
      phone: enrollment.user.phone,
      verified_email_at: enrollment.user.verified_email_at,
      role_id: enrollment.user.role_id,
      created_at: enrollment.user.created_at,
      enrollment_id: enrollment.id, // ID de la inscripción en UserCourse
      inscription_status_id: enrollment.inscription_status_id // Estado de inscripción
    }));
  } catch (error) {
    throw new Error('Error al obtener los estudiantes: ' + error.message);
  }
};


/**
 * Obtiene todos los usuarios con role_id 2, 3, 4 que no están inscritos en un curso específico.
 * 
 * @param {number} courseId - El ID del curso.
 * @returns {Promise<Array>} - La lista de usuarios que no están inscritos en el curso.
 * @throws {Error} - Si ocurre un error al obtener los usuarios.
 */
const getUsersNotEnrolledInCourse = async (courseId) => {
  try {
    // Primero verificamos que el curso existe
    const course = await Course.findByPk(courseId);
    if (!course) {
      throw new Error('Curso no encontrado');
    }

    // Obtenemos los IDs de usuarios ya inscritos
    const enrolledUserIds = await UserCourse.findAll({
      where: { course_id: courseId },
      attributes: ['user_id'],
    }).then(enrollments => enrollments.map(e => e.user_id));

    // Buscamos usuarios no inscritos
    const users = await User.findAll({
      where: {
        role_id: {
          [Op.in]: [2, 3, 4]
        },
        ...(enrolledUserIds.length > 0 && {
          id: {
            [Op.notIn]: enrolledUserIds
          }
        })
      },
      attributes: {
        exclude: ['password', 'updated_at']
      }
    });

    return users;
  } catch (error) {
    console.error('Error en getUsersNotEnrolledInCourse:', error);
    throw new Error('Error al obtener los usuarios: ' + error.message);
  }
};




module.exports = {
  createCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
  getAllCourses,
  getStudentsByCourseId,
  getUsersNotEnrolledInCourse
};