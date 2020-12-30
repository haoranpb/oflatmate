const pg = require('pg-promise')
const promise = require('bluebird')

const pgp = pg({
  promiseLib: promise,
})

const db = pgp(
  process.env.NODE_ENV === 'development'
    ? {
        host: 'localhost',
        port: 5432,
        database: 'flatmate',
        user: 'ludanxer',
        password: '',
      }
    : {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          // TODO
          rejectUnauthorized: false,
        },
      }
)

module.exports = db
