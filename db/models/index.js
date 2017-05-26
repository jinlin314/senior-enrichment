'use strict';

const User = require('./user')
const Student = require('./student');
const Campus = require('./campus');
const Instructor = require('./instructor');


Student.belongsTo(Campus); // campusId added to Student
Instructor.belongsTo(Campus);
Campus.hasMany(Student, {foreignKey: 'studentId'}); // campus.getStudent

module.exports = {User, Student, Campus, Instructor};
