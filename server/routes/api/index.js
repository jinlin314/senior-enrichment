'use strict'
const api = require('express').Router()
// const db = require('../../db')

api.use('/users', require('./users'));
api.use('/campus', require('./campus'));
api.use('/students', require('./students'));



module.exports = api;