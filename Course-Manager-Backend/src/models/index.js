const sequelize = require('../config/database');
const Role = require('./role.model');
const Modality = require('./modality.model');
const InscriptionStatus = require('./inscription_status.model');
const User = require('./user.model');
const Course = require('./course.model');
const UserCourse = require('./user_course.model');

Role.associate(sequelize.models);
Modality.associate(sequelize.models);
InscriptionStatus.associate(sequelize.models);
User.associate(sequelize.models);
Course.associate(sequelize.models);
UserCourse.associate(sequelize.models);

module.exports = {
    sequelize,
    Role,
    Modality,
    InscriptionStatus,
    User,
    Course,
    UserCourse
};