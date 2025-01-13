const bcrypt = require('bcryptjs');
const { User } = require('../models');

const seedUsers = async () => {
  const adminData = {
    first_name: 'Admin',
    last_name: 'User',
    email: 'admin@example.com',
    password: await bcrypt.hash('adminpassword', 10),
    role_id: 1
  };

  const studentData = {
    first_name: 'Student',
    last_name: 'User',
    email: 'student@example.com',
    password: await bcrypt.hash('studentpassword', 10),
    role_id: 4
  };

  const professorData = {
    first_name: 'Professor',
    last_name: 'User',
    email: 'professor@example.com',
    password: await bcrypt.hash('professorpassword', 10),
    role_id: 3
  };

  try {
    const [admin, adminCreated] = await User.findOrCreate({
      where: { email: adminData.email },
      defaults: adminData
    });

    if (adminCreated) {
      console.log('Usuario administrador creado correctamente.');
    } else {
      console.log('El usuario administrador ya existe.');
    }

    const [student, studentCreated] = await User.findOrCreate({
      where: { email: studentData.email },
      defaults: studentData
    });

    if (studentCreated) {
      console.log('Usuario estudiante creado correctamente.');
    } else {
      console.log('El usuario estudiante ya existe.');
    }

    const [professor, professorCreated] = await User.findOrCreate({
      where: { email: professorData.email },
      defaults: professorData
    });

    if (professorCreated) {
      console.log('Usuario profesor creado correctamente.');
    } else {
      console.log('El usuario profesor ya existe.');
    }
  } catch (error) {
    console.error('Error al crear los usuarios:', error.message);
  }
};

module.exports = seedUsers;