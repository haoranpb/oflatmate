const express = require('express')
const debug = require('debug')('flat:user')
const { loginRequired } = require('../utils')

const router = express.Router()
router.all('*', loginRequired)

router.get('/info', function (req, res) {
  debug('usr:', req.user)
  res.send(req.user)
})

module.exports = router
