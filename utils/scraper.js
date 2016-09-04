const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })

/**
 * Perform a search and scrape the result.
 * @param  {string}   url  URL for this query
 * @param  {string}   term Search term
 * @param  {Function} cb   Error-first callback
 */
function search (url, term, cb) {
  nightmare
    .goto(url)
    .type('form[action*="/courseSearch"] [name=searchQuery]', term)
    .click('form[action*="/courseSearch"] [id=searchForCourses]')
    .wait(1000)
    .evaluate(() => {
      let headings = [...document.querySelectorAll('#courseSearchResults thead tr th')]
        .slice(1)
        .map(th => th.innerText.trim().toLowerCase().replace(/ /g, '_'))

      let rows = document.querySelectorAll('#courseSearchResults tbody tr')

      if (!headings || !headings.innerText || !rows || !rows.innerText) {
        throw new Error('Failed to retrieve results.')
      }

      return [...rows].map(tr => {
        let current = {}

        ;[...tr.querySelectorAll('td')].slice(1).forEach((td, i) => {
          current[headings[i]] = td.innerText
        })

        return current
      })
    })
    .end()
    .then(result => cb(null, result))
    .catch(error => cb(error))
}

module.exports = exports = { search }
