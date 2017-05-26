'use strict';
var Sequelize = require('sequelize');
var db = require('../index.js');

module.exports = db.define('instructor', {
    name: Sequelize.STRING,
    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true
        }
    }
})