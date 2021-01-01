const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const crypto = require('crypto')
const debug = require('debug')('flat:pass')
const db = require('./db')
const QueryResultError = require('pg-promise').errors.QueryResultError

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    function (username, password, done) {
      debug('usr:', username, 'pwd:', password)
      db.one('SELECT password, salt, id FROM users WHERE email=$1', [username])
        .then((result) => {
          const key = crypto
            .scryptSync(password, result.salt, 64)
            .toString('hex')
          if (result.password === key) {
            debug('Success Log In:', result)
            return done(null, result)
          } else {
            debug('Password Incorrect:', result)
            return done(null, false, { message: 'Password incorrect' })
          }
        })
        .catch((err) => {
          if (err instanceof QueryResultError) {
            debug('Log In Email not Found:', err)
            return done(null, false, { message: 'Email not found' })
          } else {
            return done(err)
          }
        })
    }
  )
)

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  db.one('SELECT username, email FROM users WHERE id=$1', [id])
    .then((user) => {
      return done(null, user)
    })
    .catch((err) => {
      return done(err, null)
    })
})

module.exports = passport
