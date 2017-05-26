'use strict'
const api = require('express').Router()
// const db = require('../../db')

api.use('/users', require('./users'));
api.use('/campuses', require('./campus'));
api.use('/students', require('./students'));
api.use('/instructors', require('./instructors'));



module.exports = api;