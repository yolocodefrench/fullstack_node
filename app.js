const express = require('express')
const bodyParser = require('body-parser')
const db = require('./models')
const postRoutes = require('./app/api/post')
const authorRoutes = require('./app/api/author')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static('app/public'))

app.get('/', (req, res) => {
  res.status(200).send('Hello.')
})
authorRoutes(app, db)
postRoutes(app, db)

module.exports = app