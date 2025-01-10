const InscriptionStatus = require('../models/inscription_status.model');

const seedStatuses = async () => {
  const statuses = [
    { id: 1, name: 'Inscripto' },
    { id: 2, name: 'Aprobado' },
    { id: 3, name: 'Rechazado' },
    { id: 4, name: 'Certificado' }
  ];

  try {
    for (const status of statuses) {
      await InscriptionStatus.findOrCreate({
        where: { id: status.id },
        defaults: status
      });
    }
    console.log('Estados de inscripción inicializados correctamente.');
  } catch (error) {
    console.error('Error al inicializar los estados de inscripción:', error.message);
  }
};

module.exports = seedStatuses;