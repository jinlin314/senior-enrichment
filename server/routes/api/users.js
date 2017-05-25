'use strict'
const router = require('express').Router();
const User = require('../../../db/models/user');

router.get('/', (req, res) => res.send("this is users router"));



module.exports = router