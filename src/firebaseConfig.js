import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'

/* cSpell:disable */
firebase.initializeApp({
  apiKey: 'AIzaSyAnerucWUMP7sCjJpxsPzkfG51kvWSw84Y',
  authDomain: 'flatmate-3a1eb.firebaseapp.com',
  projectId: 'flatmate-3a1eb',
  storageBucket: 'flatmate-3a1eb.appspot.com',
  messagingSenderId: '334498550539',
  appId: '1:334498550539:web:b503b22c5f1fbe46c7c80e',
})
/* cSpell:enable */

const functions = firebase.app().functions('europe-west1')
const auth = firebase.auth()
const db = firebase.firestore()

if (process.env.NODE_ENV == 'development') {
  const emulatorConfig = require('../firebase.json').emulators
  functions.useEmulator('localhost', emulatorConfig.functions.port)
  auth.useEmulator(`http://localhost:${emulatorConfig.auth.port}/`)
  db.useEmulator('localhost', emulatorConfig.firestore.port)
}

// firebase can be replaced with smaller field
export { db, functions, auth, firebase }
