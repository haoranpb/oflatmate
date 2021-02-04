/*
  Currently no better way to get the user asynchronously
  https://github.com/firebase/firebase-js-sdk/issues/462

  It's also wired that after this function returned,
  `currentUser` can still be null
 */
function getCurrentUser(auth) {
  return new Promise((resolve, reject) => {
    if (auth.currentUser) {
      resolve(auth.currentUser)
    }
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe()
      resolve(user)
    }, reject)
  })
}

const userMixin = {
  computed: {
    $user() {
      return this.$store.state.user
    },
  },
}

const DEFAULT_SIGNIN_PATH = '/user'

export { getCurrentUser, userMixin, DEFAULT_SIGNIN_PATH }
