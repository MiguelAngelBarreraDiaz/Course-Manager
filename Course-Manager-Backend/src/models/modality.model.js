const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Modality = sequelize.define('Modality', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'modalities',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// Asociaciones
Modality.associate = (models) => {
  Modality.hasMany(models.Course, {
    foreignKey: 'modality_id',
    as: 'courses'
  });
};

module.exports = Modality;
