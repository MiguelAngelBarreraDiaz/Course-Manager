const { Sequelize } = require('sequelize');

// Configuración de conexión a la base de datos utilizando variables de entorno
const sequelize = new Sequelize(
  process.env.DB_NAME,       // Nombre de la base de datos
  process.env.DB_USER,       // Usuario de la base de datos
  process.env.DB_PASSWORD,   // Contraseña de la base de datos
  {
    host: process.env.DB_HOST, // Host de la base de datos (desde Docker, 'database')
    port: process.env.DB_PORT, // Puerto de la base de datos
    dialect: 'mysql',          // Motor de la base de datos
    logging: false,            // Desactiva el registro de consultas SQL en consola
  }
);

module.exports = sequelize;