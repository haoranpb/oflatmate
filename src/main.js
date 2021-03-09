import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store.js'
import { userMixin } from './utils'
import felafel from '@oflatmate/felafel'
import { functions, auth } from './firebaseConfig'
import 'tailwindcss/tailwind.css'

const app = createApp(App).use(router).use(store).use(felafel)

// make $user available in every component
app.mixin(userMixin)

app.config.globalProperties.$auth = auth
// make cloud function call simpler
app.config.globalProperties.$func = (funcName, data) => {
  return functions.httpsCallable(funcName)(data)
}

app.mount('#app')
