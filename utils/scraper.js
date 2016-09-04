const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })

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

      return [...document.querySelectorAll('#courseSearchResults tbody tr')].map(tr => {
        let current = {}

        ;[...tr.querySelectorAll('td')].slice(1).forEach((td, i) => {
          let key = headings[i]

          current[key] = td.innerText
        })

        return current
      })
    })
    .end()
    .then((result) => cb(null, result))
    .catch((error) => cb(error))
}

module.exports = exports = { search }
