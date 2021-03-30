import isEmail from 'validator/es/lib/isEmail'
import DOMPurify from 'dompurify'

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

export { validateInput }
