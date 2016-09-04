/**
 * coursefinder
 * A Node.js scraper for UofT's Course Finder.
 * Kashav Madan <kshvmdn@gmail.com> (http://kshvmdn.com)
 */

const scraper = require('./utils/scraper')
const BASE_URL = 'http://coursefinder.utoronto.ca'

/**
 * Perform a Course Finder search.
 * @param  {string}   term  Term to search for.
 * @param  {Function} cb    Optional error-first callback.
 * @return {Promise}
 */
function search (term, cb) {
  return new Promise((resolve, reject) => {
    if (!term) {
      let e = new Error('Expected search term.')
      if (cb) cb(e)
      reject(e)
      return
    }

    scraper.search(BASE_URL, term, (err, res) => {
      if (err || !res ) {
        let e = err || new Error('Failed to retrieve results')
        if (cb) cb(e)
        reject(e)
        return
      }

      if (cb) cb(null, res)
      resolve(res)
      return
    })
  })
}

module.exports = exports = { search }
