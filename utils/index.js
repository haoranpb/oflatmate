/**
 * Get current date in yyyy-mm-dd format
 *
 * Need some change to deal with time zone issue:
 * https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
 */

function getCurrentYmd() {
  return new Date().toISOString().slice(0, 10)
}

export { getCurrentYmd }
