const express = require('express');
const { sequelize } = require('./models');
const seedRoles = require('./seeders/roles_seeder');
const seedModalities = require('./seeders/modalities_seeder');
const seedStatuses = require('./seeders/statuses_seeder');

const app = express();


// Sincronizar la base de datos y ejecutar los seeders
const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida exitosamente.');

    // Sincronizar modelos
    await sequelize.sync({ force: true });
    console.log('Modelos sincronizados correctamente.');

    // Ejecutar seeders
    await seedRoles();
    await seedModalities();
    await seedStatuses();
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error.message);
  }
};

initializeDatabase();

module.exports = app;