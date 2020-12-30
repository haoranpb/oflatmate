const express = require('express')
const session = require('express-session')
const helmet = require('helmet')
const history = require('connect-history-api-fallback')
const path = require('path')
const passport = require('./pass')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')

const app = express()
const PORT = process.env.PORT || 3000

if (process.env.NODE_ENV === 'development') {
  const cors = require('cors')
  app.use(cors({ origin: 'http://localhost:8080', credentials: true }))
}

app.use(history())
app.use(express.static(path.join(__dirname, 'dist')))
app.use(helmet())
app.use(
  session({
    secret: process.env.NODE_ENV === 'development' ? 'dev' : process.env.SECRET,
    // store: https://github.com/tj/connect-redis
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      name: 'sessionId',
      // secure: true, // TODO
    },
  })
)
app.use(express.urlencoded({ extended: false }))
app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', authRoutes)
app.use('/user', userRoutes)

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
})
