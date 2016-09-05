## coursefinder [![npm version](https://badge.fury.io/js/coursefinder.svg)](https://badge.fury.io/js/coursefinder) [![Build Status](https://travis-ci.org/kshvmdn/uoft-coursefinder.svg?branch=master)](https://travis-ci.org/kshvmdn/uoft-coursefinder)

A Node.js library for interfacing with UofT Course Finder.

### Install

Either install via [npm](https://www.npmjs.com/package/coursefinder) or via [source](https://github.com/kshvmdn/uoft-coursefinder/archive/master.zip).

- npm

  ```sh
  npm install [--save] [--global] coursefinder
  ```

- Source

  ```sh
  git clone https://github.com/kshvmdn/uoft-coursefinder.git && npm install
  ```

### Usage

#### API

```js
const coursefinder = require('coursefinder')
```

##### `search(term, cb)`

- Retrieve top 20 results (PR for implemeting pagination would be very appreciated!) for the provided search term.
- Supports both Promises and error-first callbacks, use whichever you prefer :smile:.

  ```js
  coursefinder.search('csc207', (err, res) => {
    if (err) {
      console.error(err)
      return
    }

    console.log(res)
  })
  ```

  ```js
  let request = coursefinder.search('csc207')

  request.then(res => console.log(res))
  request.catch(err => console.err(err))
  ```

- Sample response:

  ```json
  [
    {
      "campus": "St. George",
      "code": "CSC207H1",
      "course_name": "Software Design",
      "credits": "0.5",
      "department": "Computer Science",
      "division": "Faculty of Arts and Science",
      "term": "2016 Fall"
    },
    {
      "campus": "St. George",
      "code": "CSC207H1",
      "course_name": "Software Design",
      "credits": "0.5",
      "department": "Computer Science",
      "division": "Faculty of Arts and Science",
      "term": "2017 Winter"
    },
    {
      "campus": "Mississauga",
      "code": "CSC207H5",
      "course_name": "Software Design",
      "credits": "0.5",
      "department": "Mathematical and Computational Sciences",
      "division": "University of Toronto Mississauga",
      "term": "2016 Fall"
    }
  ]
  ```

##### `inquiry(code, cb)`

- Retrieve data for the provided course code.
- Parameter `code` can be retrieved from the [`course-search/search/courseInquiry`](http://coursefinder.utoronto.ca/course-search/search/courseInquiry?methodToCall=start&viewId=CourseDetails-InquiryView&courseId=CSC207H1F20169).
- Supports both Promises and error-first callbacks, use whichever you prefer :smile:.

  ```js
  coursefinder.inquiry('CSC207H1F20169', (err, res) => {
    if (err) {
      console.error(err)
      return
    }

    console.log(res)
  })
  ```

  ```js
  let request = coursefinder.inquiry('CSC207H1F20169')

  request.then(res => console.log(res))
  request.catch(err => console.err(err))
  ```

- Sample response:

  ```json
  {
    "arts_and_science_breadth": "(5) The Physical and Mathematical Universes",
    "arts_and_science_distribution": "Science",
    "campus": "St. George",
    "course_description": "An introduction to software design and development concepts, methods, and tools using a statically-typed object-oriented programming language such as Java. Topics from: version control, unit testing, refactoring, object-oriented design and development, design patterns, advanced IDE usage, regular expressions, and reflection.  Representation of \u001aoating-point numbers and introduction to numerical computation.",
    "course_level": "200/B",
    "department": "Computer Science",
    "division": "Faculty of Arts and Science",
    "last_updated": "2016-09-04 19:15:15.0",
    "meeting_sections": [
      {
        "activity": "Lec 0101",
        "class_size": "117",
        "current_enrolment": "111",
        "day_and_time": [
          "TUESDAY 10:00-11:00",
          "WEDNESDAY 10:00-11:00",
          "FRIDAY 10:00-11:00"
        ],
        "delivery_mode": "IN-CLASS",
        "instructor": "L Shorser",
        "location": [
          "BA 1170",
          "BA 1170",
          "BA 1170"
        ],
        "option_to_waitlist": true
      },
      {
        "activity": "Lec 0201",
        "class_size": "130",
        "current_enrolment": "130",
        "day_and_time": [
          "WEDNESDAY 12:00-13:00",
          "TUESDAY 14:00-15:00",
          "FRIDAY 12:00-13:00"
        ],
        "delivery_mode": "IN-CLASS",
        "instructor": "L Shorser",
        "location": [
          "RW 117",
          "RW 117",
          "RW 117"
        ],
        "option_to_waitlist": true
      },
      {
        "activity": "Lec 0301",
        "class_size": "130",
        "current_enrolment": "27",
        "day_and_time": [
          "FRIDAY 13:00-14:00",
          "FRIDAY 14:00-16:00"
        ],
        "delivery_mode": "IN-CLASS",
        "instructor": "P Gries",
        "location": [
          "LM 161",
          "LM 161"
        ],
        "option_to_waitlist": true
      },
      {
        "activity": "Lec 2000",
        "class_size": "13",
        "current_enrolment": "9",
        "day_and_time": [
          "WEDNESDAY 10:00-11:00",
          "FRIDAY 10:00-11:00",
          "TUESDAY 10:00-11:00"
        ],
        "delivery_mode": "IN-CLASS",
        "instructor": "",
        "location": [
          "BA 1170",
          "BA 1170",
          "BA 1170"
        ],
        "option_to_waitlist": false
      },
      {
        "activity": "Lec 5101",
        "class_size": "130",
        "current_enrolment": "37",
        "day_and_time": [
          "WEDNESDAY 17:00-18:00",
          "WEDNESDAY 18:00-20:00"
        ],
        "delivery_mode": "IN-CLASS",
        "instructor": "",
        "location": [
          "LM 161",
          "LM 161"
        ],
        "option_to_waitlist": true
      }
    ],
    "pre-requisites": "60% or higher in CSC148H1/CSC150H1",
    "term": "2016 Fall",
    "title": "CSC207H1: Software Design"
  }
  ```

### CLI
  
  ```sh
  $ coursefinder --help
  Usage:
    coursefinder <method> <argument> [--pretty] [--show]

  Arguments:
    method         coursefinder method to call (one of search / inquiry) [must be first]
    argument       term / code to use with method [must be second]
    -h, --help     view this help dialog
    -p, --pretty   pretty print the JSON response
    -s, --show     render a browser window and watch the scraping as it happens

  Examples:
    coursefinder search csc207
    coursefinder search csc207 --pretty
    coursefinder search csc207 --show --pretty
  ```

  - Examples:
    
    ```sh
    $ coursefinder search csc207
    [ { campus: 'St. George',
        code: 'CSC207H1',
        course_name: 'Software Design',
        credits: '0.5',
        department: 'Computer Science',
        division: 'Faculty of Arts and Science',
        term: '2016 Fall' },
        { campus: 'St. George',
        code: 'CSC207H1',
        course_name: 'Software Design',
        credits: '0.5',
        department: 'Computer Science',
        division: 'Faculty of Arts and Science',
        term: '2017 Winter' },
        { campus: 'Mississauga',
        code: 'CSC207H5',
        course_name: 'Software Design',
        credits: '0.5',
        department: 'Mathematical and Computational Sciences',
        division: 'University of Toronto Mississauga',
        term: '2016 Fall' } ]
    ```

    ```sh
    $ coursefinder search csc207 --pretty
    Array [
      Object {
        "campus": "St. George",
        "code": "CSC207H1",
        "course_name": "Software Design",
        "credits": "0.5",
        "department": "Computer Science",
        "division": "Faculty of Arts and Science",
        "term": "2016 Fall"
      },
      Object {
        "campus": "St. George",
        "code": "CSC207H1",
        "course_name": "Software Design",
        "credits": "0.5",
        "department": "Computer Science",
        "division": "Faculty of Arts and Science",
        "term": "2017 Winter"
      },
      Object {
        "campus": "Mississauga",
        "code": "CSC207H5",
        "course_name": "Software Design",
        "credits": "0.5",
        "department": "Mathematical and Computational Sciences",
        "division": "University of Toronto Mississauga",
        "term": "2016 Fall"
      }
    ]
    ```

### Contribute

This project is completely open source. Feel free to [open an issue](https://github.com/kshvmdn/uoft-coursefinder/issues) or [submit a pull request](https://github.com/kshvmdn/uoft-coursefinder/pulls).

### License

[MIT](https://github.com/kshvmdn/uoft-coursefinder/blob/master/LICENSE) © [Kashav Madan](http://kshvmdn.com).
