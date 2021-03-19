/*
  This will result in $store.state.user.user,
  but can't think of a better way of doing this
*/
const user = {
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
}

export default user
