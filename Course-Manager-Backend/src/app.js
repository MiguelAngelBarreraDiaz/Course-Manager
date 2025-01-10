const express = require('express');
const userRoutes = require('./routes/user.routes');
const courseRoutes = require('./routes/course.routes');
const enrollmentRoutes = require('./routes/enrollment.routes');
const authRoutes = require('./routes/auth.routes');
const { sequelize } = require('./models');
const seedRoles = require('./seeders/roles_seeder');
const seedModalities = require('./seeders/modalities_seeder');
const seedStatuses = require('./seeders/statuses_seeder');
const seedAdminUser = require('./seeders/users_seeder');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/courses', courseRoutes);
app.use('/enrollments', enrollmentRoutes);

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
    await seedAdminUser();
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error.message);
  }
};

initializeDatabase();


module.exports = app;