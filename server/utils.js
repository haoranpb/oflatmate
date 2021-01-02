const debug = require('debug')('flat:utils')

function loginRequired(req, res, next) {
  debug(req.user)
  req.user === undefined ? res.status(401).end() : next()
}

module.exports = { loginRequired }
