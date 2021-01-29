const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp()

exports.helloWorld = functions
  .region('europe-west1')
  .https.onRequest((request, response) => {
    response.send('Hello from Firebase!')
  })
