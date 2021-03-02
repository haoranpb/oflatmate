import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'
import { emulators } from '../firebase.json'

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

if (import.meta.env.DEV) {
  functions.useEmulator('localhost', emulators.functions.port)
  auth.useEmulator(`http://localhost:${emulators.auth.port}/`)
  db.useEmulator('localhost', emulators.firestore.port)
}

const authProviders = [
  firebase.auth.EmailAuthProvider.PROVIDER_ID,
  firebase.auth.GoogleAuthProvider.PROVIDER_ID,
]

const filedValDel = firebase.firestore.FieldValue.delete()

export { db, functions, auth, filedValDel, authProviders }
