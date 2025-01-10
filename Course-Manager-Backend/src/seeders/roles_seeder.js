const Role = require('../models/role.model');

const seedRoles = async () => {
  const roles = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'Coordinador' },
    { id: 3, name: 'Docente' },
    { id: 4, name: 'Estudiante' }
  ];

  try {
    for (const role of roles) {
      await Role.findOrCreate({
        where: { id: role.id },
        defaults: role
      });
    }
    console.log('Roles inicializados correctamente.');
  } catch (error) {
    console.error('Error al inicializar los roles:', error.message);
  }
};

module.exports = seedRoles;

