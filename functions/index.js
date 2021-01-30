const functions = require('firebase-functions')
const admin = require('firebase-admin')

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
