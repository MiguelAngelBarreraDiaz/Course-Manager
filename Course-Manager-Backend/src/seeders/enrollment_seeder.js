const { User, Course, UserCourse } = require('../models');

const seedEnrollments = async () => {
  try {
    // Obtener los usuarios de prueba
    const student = await User.findOne({ where: { email: 'student@example.com' } });
    const professor = await User.findOne({ where: { email: 'professor@example.com' } });

    if (!student || !professor) {
      throw new Error('No se encontraron los usuarios de prueba');
    }

    // Obtener los cursos de prueba
    const courses = await Course.findAll({
      where: {
        name: ['Curso de Programación en JavaScript', 'Curso de Desarrollo Web', 'Curso de Bases de Datos']
      }
    });

    if (courses.length !== 3) {
      throw new Error('No se encontraron los cursos de prueba');
    }

    // Matricular al estudiante en todos los cursos
    for (const course of courses) {
      await UserCourse.findOrCreate({
        where: { user_id: student.id, course_id: course.id },
        defaults: { user_id: student.id, course_id: course.id , inscription_status_id: 1}
      });
    }

    // Matricular al profesor en todos los cursos
    for (const course of courses) {
      await UserCourse.findOrCreate({
        where: { user_id: professor.id, course_id: course.id },
        defaults: { user_id: professor.id, course_id: course.id , inscription_status_id: 1}
      });
    }

    console.log('Matriculaciones creadas correctamente.');
  } catch (error) {
    console.error('Error al crear las matriculaciones:', error.message);
  }
};


module.exports = seedEnrollments;