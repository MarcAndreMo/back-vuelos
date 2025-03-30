/**
 *
 * @param {string} message
 * @param {number} code
 * @returns
 */
function err(message, code = 500) {
  let e = new Error(message);

  if (code) {
    e.statusCode = code;
  }

  return e;
}

export default err;
