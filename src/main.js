import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store.js'
import { userMixin } from './utils'
import 'tailwindcss/tailwind.css'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'

const app = createApp(App).use(router).use(store)

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
const db = firebase.firestore()
if (process.env.NODE_ENV == 'development') {
  const emulatorConfig = require('../firebase.json').emulators
  functions.useEmulator('localhost', emulatorConfig.functions.port)
  firebase.auth().useEmulator(`http://localhost:${emulatorConfig.auth.port}/`)
  db.useEmulator('localhost', emulatorConfig.firestore.port)
}
// make $user available in every component
app.mixin(userMixin)

app.config.globalProperties.$firebase = firebase
router.$firebase = firebase
// unnecessary, but easy reference
app.config.globalProperties.$db = db
app.config.globalProperties.$func = functions

app.mount('#app')
