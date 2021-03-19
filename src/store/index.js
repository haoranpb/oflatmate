import { createStore } from 'vuex'
import flat from '@/store/flat.js'
import user from '@/store/user.js'

export default createStore({
  modules: {
    flat,
    user,
  },
})
