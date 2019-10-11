// resgister bebel polyfill and require hook

require('dotenv').config()

require('babel-polyfill')
require('babel-register')

// register the main script server file
require('./src/main')
