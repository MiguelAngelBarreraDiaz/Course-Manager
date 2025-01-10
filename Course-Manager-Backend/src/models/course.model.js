const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Course = sequelize.define('Course', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  modality_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'modalities',
      key: 'id'
    }
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quota: {
    type: DataTypes.INTEGER,
    allowNull: false
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
  tableName: 'courses',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// Asociaciones
Course.associate = (models) => {
  Course.belongsTo(models.Modality, {
    foreignKey: 'modality_id',
    as: 'modality'
  });
  Course.belongsToMany(models.User, {
    through: models.UserCourse,
    foreignKey: 'course_id',
    as: 'users'
  });
};

module.exports = Course;