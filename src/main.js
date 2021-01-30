import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import 'tailwindcss/tailwind.css'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'

const app = createApp(App).use(router)

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
if (process.env.NODE_ENV == 'development') {
  functions.useEmulator('localhost', 5001)
}

app.config.globalProperties.$firebase = firebase
// unnecessary, but easy reference
app.config.globalProperties.$db = firebase.firestore()
app.config.globalProperties.$func = functions
app.config.globalProperties.$user = null
router.app = app

app.mount('#app')
