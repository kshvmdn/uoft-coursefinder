/**
 * coursefinder
 * A Node.js scraper for UofT's Course Finder.
 * Kashav Madan <kshvmdn@gmail.com> (http://kshvmdn.com)
 */

const scraper = require('./utils/scraper')
const BASE_URL = 'http://coursefinder.utoronto.ca/course-search/search'

/**
 * Perform Course Finder search inquiry.
 * @param  {string}   code Course code.
 * @param  {Function} cb   Optional error-first callback.
 * @return {Promise}
 */
function inquiry (code, cb) {
  let url = `${BASE_URL}/courseInquiry?methodToCall=start&viewId=CourseDetails-InquiryView&courseId=${code}`

  return new Promise((resolve, reject) => {
    if (!code) {
      let e = new Error('Expected course code.')
      if (cb) cb(e)
      reject(e)
      return
    }

    scraper.inquiry(url, (err, res) => {
      if (err || !res) {
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

/**
 * Perform a Course Finder search.
 * @param  {string}   term  Term to search for.
 * @param  {Function} cb    Optional error-first callback.
 * @return {Promise}
 */
function search (term, cb) {
  let url = `${BASE_URL}/courseSearch?methodToCall=start&viewId=CourseSearch-FormView`

  return new Promise((resolve, reject) => {
    if (!term) {
      let e = new Error('Expected search term.')
      if (cb) cb(e)
      reject(e)
      return
    }

    scraper.search(url, term, (err, res) => {
      if (err || !res) {
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

module.exports = exports = { inquiry, search }
