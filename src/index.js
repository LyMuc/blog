const express = require('express')
const app = express()
const port = 3000
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const path = require('path')

// Template engine
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'resources/views') )

//Static files
app.use(express.static(path.join(__dirname, 'public')))

// HTTP request logger middleware
app.use(morgan('combined'))

app.get('/', (req, res) => {
  res.render('home');
})

app.get('/news', (req, res) => {
  res.render('news');
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
