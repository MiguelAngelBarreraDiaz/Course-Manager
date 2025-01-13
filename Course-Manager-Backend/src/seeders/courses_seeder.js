const { Course } = require('../models');

const seedCourses = async () => {
  const coursesData = [
    {
      name: 'Curso de Programación en JavaScript',
      modality_id: 1, // Virtual
      duration: 8, // 8 semanas
      quota: 30
    },
    {
      name: 'Curso de Desarrollo Web',
      modality_id: 2, // Remoto
      duration: 12, // 12 semanas
      quota: 25
    },
    {
      name: 'Curso de Bases de Datos',
      modality_id: 3, // Presencial
      duration: 10, // 10 semanas
      quota: 20
    }
  ];

  try {
    for (const courseData of coursesData) {
      const [course, created] = await Course.findOrCreate({
        where: { name: courseData.name },
        defaults: courseData
      });

      if (created) {
        console.log(`Curso "${course.name}" creado correctamente.`);
      } else {
        console.log(`El curso "${course.name}" ya existe.`);
      }
    }
  } catch (error) {
    console.error('Error al crear los cursos:', error.message);
  }
};


module.exports = seedCourses;