const Nightmare = require('nightmare')

function inquiry (url, cb) {
  const nightmare = Nightmare({ show: true, waitTimeout: 2500 })

  nightmare
    .goto(url)
    .wait('#Uif-PageContentWrapper')
    .evaluate(() => {
      let course = {}

      course.title = document.querySelector('.uif-headerText').innerText

      ;[...document.querySelector('#u18_boxLayout').querySelectorAll('div')]
        .filter(div => div.getAttribute('data-label') !== null)
        .forEach(div => {
          let key = div.querySelector('label').innerText.toLowerCase().replace(/ /g, '_')
          if (div.querySelector(`span[id=${div.id}`)) {
            course[key] = div.querySelector(`span[id=${div.id}`).innerText
          }
        })

      let headings = [...document.querySelectorAll('#Activity-details table thead tr th')]
        .map(th => th.innerText.toLowerCase().replace(/ /g, '_'))

      course.meeting_sections = [...document.querySelectorAll('#Activity-details table tbody tr')]
        .map(tr => {
          let current = {}

          ;[...tr.querySelectorAll('td')].forEach((td, i) => {
            let key = headings[i]

            let value = null

            if (key === 'option_to_waitlist') {
              value = td.querySelector('img').getAttribute('src').includes('checkmark')
            } else {
              value = td.innerText.trim()

              if (key === 'day_and_time' || key === 'location') {
                value = value.split('\n').map(o => o.trim())
              }
            }

            current[key] = value
          })

          return current
        })
      return course
    })
    .end()
    .then(result => cb(null, result))
    .catch(error => cb(error))
}

/**
 * Perform a search and scrape the result.
 * @param  {string}   url  URL for this query
 * @param  {string}   term Search term
 * @param  {Function} cb   Error-first callback
 */
function search (url, term, cb) {
  const nightmare = Nightmare({ show: true })

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

module.exports = exports = { inquiry, search }
