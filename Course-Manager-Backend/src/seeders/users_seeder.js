const bcrypt = require('bcryptjs');
const { User } = require('../models');

const seedAdminUser = async () => {
  const adminData = {
    first_name: 'Admin',
    last_name: 'User',
    email: 'admin@example.com',
    password: await bcrypt.hash('adminpassword', 10),
    role_id: 1
  };

  try {
    const [admin, created] = await User.findOrCreate({
      where: { email: adminData.email },
      defaults: adminData
    });

    if (created) {
      console.log('Usuario administrador creado correctamente.');
    } else {
      console.log('El usuario administrador ya existe.');
    }
  } catch (error) {
    console.error('Error al crear el usuario administrador:', error.message);
  }
};

module.exports = seedAdminUser;