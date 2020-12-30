const express = require('express')
const crypto = require('crypto')
const db = require('../db')
const pass = require('../pass')
const debug = require('debug')('flat:auth')

const router = express.Router()

router.post('/signin', function (req, res, next) {
  pass.authenticate('local', function (err, user, info) {
    debug(info) // TODO: can this be prettier?
    if (err) {
      return next(err)
    }
    if (!user) {
      return res.status(401).send(info.message)
    } else {
      req.login(user, function (err) {
        if (err) {
          return next(err)
        }
        return res.end()
      })
    }
  })(req, res, next)
})

router.post('/signup', function (req, res) {
  const salt = crypto.randomBytes(32).toString('hex')
  const key = crypto.scryptSync(req.body.password, salt, 64).toString('hex')
  db.none(
    'INSERT INTO users(username, password, email, salt) VALUES($1, $2, $3, $4)',
    [req.body.username, key, req.body.email, salt]
  )
    .then(() => {
      res.send('User created!')
    })
    .catch((err) => {
      debug(err)
      res.send(err.detail)
    })
})

router.get('/signout', function (req, res) {
  req.logout()
  res.redirect('/')
})

module.exports = router
