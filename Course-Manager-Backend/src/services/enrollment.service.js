const { UserCourse, Course, User } = require('../models');

/**
 * Matricula a un estudiante en un curso.
 * 
 * @param {Object} enrollmentData - Los datos de la matrícula a crear.
 * @returns {Object} - La matrícula creada.
 * @throws {Error} - Si ocurre un error al crear la matrícula.
 */
const enrollStudent = async (enrollmentData) => {
  try {
    const enrollment = await UserCourse.create(enrollmentData);
    return enrollment;
  } catch (error) {
    throw new Error('Error al matricular al estudiante: ' + error.message);
  }
};

/**
 * Obtiene una matrícula por su ID.
 * 
 * @param {number} id - El ID de la matrícula a obtener.
 * @returns {Object} - La matrícula encontrada.
 * @throws {Error} - Si la matrícula no se encuentra o si ocurre un error al obtener la matrícula.
 */
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

/**
 * Actualiza una matrícula por su ID.
 * 
 * @param {number} id - El ID de la matrícula a actualizar.
 * @param {Object} enrollmentData - Los nuevos datos de la matrícula.
 * @returns {Object} - La matrícula actualizada.
 * @throws {Error} - Si la matrícula no se encuentra o si ocurre un error al actualizar la matrícula.
 */
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

/**
 * Elimina una matrícula por su ID.
 * 
 * @param {number} id - El ID de la matrícula a eliminar.
 * @returns {Object} - Un mensaje indicando que la matrícula fue eliminada correctamente.
 * @throws {Error} - Si la matrícula no se encuentra o si ocurre un error al eliminar la matrícula.
 */
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

/**
 * Obtiene todas las matrículas por `user_id` e incluye el curso asociado.
 * 
 * @param {number} userId - El ID del usuario.
 * @returns {Array} - La lista de matrículas con los cursos asociados.
 * @throws {Error} - Si ocurre un error al obtener las matrículas.
 */
const getEnrollmentsByUserId = async (userId) => {
  try {
    const enrollments = await UserCourse.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Course,
          as: 'course'
        }
      ]
    });
    return enrollments;
  } catch (error) {
    throw new Error('Error al obtener las matrículas: ' + error.message);
  }
};


/**
 * Obtiene todas las matrículas por `professor_id` e incluye el curso y los estudiantes asociados.
 * 
 * @param {number} professorId - El ID del profesor.
 * @returns {Array} - La lista de matrículas con los cursos y estudiantes asociados.
 * @throws {Error} - Si ocurre un error al obtener las matrículas.
 */
const getEnrollmentsByProfessorId = async (professorId) => {
  try {
    const enrollments = await UserCourse.findAll({
      where: { user_id: professorId },
      include: [
        {
          model: Course,
          as: 'course',
          include: [
            {
              model: UserCourse,
              as: 'enrollments',
              include: [
                {
                  model: User,
                  as: 'user',
                  where: { role_id: 4 }
                }
              ]
            }
          ]
        }
      ]
    });
    return enrollments;
  } catch (error) {
    throw new Error('Error al obtener las matrículas: ' + error.message);
  }
};



module.exports = {
  enrollStudent,
  getEnrollmentById,
  getEnrollmentsByUserId,
  getEnrollmentsByProfessorId,
  updateEnrollment,
  deleteEnrollment
};