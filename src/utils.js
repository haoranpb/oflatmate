import isEmail from 'validator/es/lib/isEmail'
import DOMPurify from 'dompurify'

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

/**
 * Validate user input
 * @param {String} input the user input string
 * @param {Object} [config] the validate configuration
 * @param {Boolean} config.email check if the input is email
 * @param {Number|Boolean} config.length check if the input exceed certain length
 * @returns {{error: Boolean, message: String, data: String}} error ? message : data
 */
function validateInput(input, { email = false, length = false }) {
  // @returns {{error: Boolean, message: String, data: String}}
  input = input.trim()

  if (input == '') {
    return { error: true, message: "input can't be empty or only spaces" }
  } else if (length && length < input.length) {
    return { error: true, message: `input length exceeded, max: ${length}` }
  }

  if (email) {
    return isEmail(input)
      ? { error: false, data: input }
      : { error: true, message: "the email address isn't correct" }
  } else {
    return { error: false, data: DOMPurify.sanitize(input) }
  }
}

const userMixin = {
  computed: {
    $user() {
      return this.$store.state.user
    },
  },
}

const DEFAULT_SIGNIN_PATH = '/user'

export { getCurrentUser, validateInput, userMixin, DEFAULT_SIGNIN_PATH }
