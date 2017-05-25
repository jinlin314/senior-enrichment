'use strict';

const User = require('./user')
const Student = require('./student');
const Campus = require('./campus');


Student.belongsTo(Campus); // campusId added to Student
Campus.hasMany(Student, {foreignKey: 'studentId'}); // campus.getStudent

module.exports = {User, Student, Campus};
