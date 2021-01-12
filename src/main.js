import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import 'tailwindcss/tailwind.css'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const app = createApp(App).use(router)

/* cSpell:disable */
const firebaseConfig = {
  apiKey: 'AIzaSyAnerucWUMP7sCjJpxsPzkfG51kvWSw84Y',
  authDomain: 'flatmate-3a1eb.firebaseapp.com',
  projectId: 'flatmate-3a1eb',
  storageBucket: 'flatmate-3a1eb.appspot.com',
  messagingSenderId: '334498550539',
  appId: '1:334498550539:web:b503b22c5f1fbe46c7c80e',
}
/* cSpell:enable */
firebase.initializeApp(firebaseConfig)

app.config.globalProperties.$firebase = firebase
app.config.globalProperties.$db = firebase.firestore() // easy reference
app.config.globalProperties.$user = null
router.app = app

app.mount('#app')
