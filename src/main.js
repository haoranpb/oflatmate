import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import 'tailwindcss/tailwind.css'
import axios from 'axios'

const app = createApp(App)
app.config.globalProperties.$http = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: true, // should this be set per request?
})
app.use(router).mount('#app')
