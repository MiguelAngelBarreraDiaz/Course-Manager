const Modality = require('../models/modality.model');

const seedModalities = async () => {
  const modalities = [
    { id: 1, name: 'Virtual' },
    { id: 2, name: 'Remoto' },
    { id: 3, name: 'Presencial' }
  ];

  try {
    for (const modality of modalities) {
      await Modality.findOrCreate({
        where: { id: modality.id },
        defaults: modality
      });
    }
    console.log('Modalidades inicializadas correctamente.');
  } catch (error) {
    console.error('Error al inicializar las modalidades:', error.message);
  }
};

module.exports = seedModalities;