'use strict'
const router = require('express').Router()

router.use('/api', require('./api'));
router.get('/hello', (req, res) => res.send({hello: 'world'}));



module.exports = router