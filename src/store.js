import { createStore } from 'vuex'

const store = createStore({
  strict: process.env.NODE_ENV !== 'production',
  state() {
    return {
      user: null,
    }
  },
  mutations: {
    setUser(state, newUser) {
      state.user = newUser
    },
    clearUser(state) {
      state.user = null
    },
  },
})

export default store
