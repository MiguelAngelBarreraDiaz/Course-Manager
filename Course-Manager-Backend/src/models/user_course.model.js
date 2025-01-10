const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserCourse = sequelize.define('UserCourse', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  course_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'courses',
      key: 'id'
    }
  },
  inscription_status_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'inscription_status',
      key: 'id'
    }
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
  tableName: 'user_course',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// Asociaciones
UserCourse.associate = (models) => {
  UserCourse.belongsTo(models.User, {
    foreignKey: 'user_id',
    as: 'user'
  });
  UserCourse.belongsTo(models.Course, {
    foreignKey: 'course_id',
    as: 'course'
  });
  UserCourse.belongsTo(models.InscriptionStatus, {
    foreignKey: 'inscription_status_id',
    as: 'status'
  });
};

module.exports = UserCourse;