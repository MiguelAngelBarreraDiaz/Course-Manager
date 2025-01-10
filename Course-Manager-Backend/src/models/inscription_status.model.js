const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const InscriptionStatus = sequelize.define('InscriptionStatus', {
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
  tableName: 'inscription_status',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// Asociaciones
InscriptionStatus.associate = (models) => {
  InscriptionStatus.hasMany(models.UserCourse, {
    foreignKey: 'inscription_status_id',
    as: 'enrollments'
  });
};

module.exports = InscriptionStatus;