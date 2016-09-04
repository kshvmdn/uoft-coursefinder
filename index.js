/**
 * coursefinder
 * A Node.js scraper for UofT's Course Finder.
 * Kashav Madan <kshvmdn@gmail.com> (http://kshvmdn.com)
 */

const scraper = require('./utils/scraper')
const BASE_URL = 'http://coursefinder.utoronto.ca'

function search (term, cb) {
  return new Promise((resolve, reject) => {
    if (!term) {
      let e = new Error('Expected search term.')
      cb(e)
      reject(e)
      return
    }

    scraper.search(BASE_URL, term, (err, res) => {
      if (err || !res) {
        let e = err || new Error('Failed to retrieve results')
        cb(e)
        reject(e)
        return
      }

      cb(null, res)
      return resolve(res)
    })
  })
}

module.exports = exports = { search }
