const express = require('express')
const debug = require('debug')('flat:user')

const router = express.Router()

// TODO: how to enforce authentication for API like this
router.get('/info', function (req, res) {
  debug('usr:', req.user)
  res.send(req.user)
})

module.exports = router
