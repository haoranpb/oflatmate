const functions = require('firebase-functions')
const admin = require('firebase-admin')

const config =
  Object.keys(functions.config()).length === 0
    ? require('./env.json').env
    : functions.config().env

admin.initializeApp()

exports.getUsersInfo = functions
  .region('europe-west1')
  .https.onCall((request) => {
    return admin.auth().getUsers(
      request.map((item) => {
        return { uid: item }
      })
    )
  })
