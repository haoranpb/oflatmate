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

/*
  Shuffle an array, ref: https://stackoverflow.com/a/2450976/9478849
*/

function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }
  return array
}

const userMixin = {
  computed: {
    $user() {
      return this.$store.state.user.user
    },
  },
}

const DEFAULT_SIGNIN_PATH = '/flat'

export { getCurrentUser, shuffle, userMixin, DEFAULT_SIGNIN_PATH }
