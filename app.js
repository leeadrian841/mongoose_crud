var express = require('express')
var path = require('path')
// var debug = require("debug")
// var logger = require('morgan')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
// var expressLayouts = require('express-ejs-layouts')
var app = express()
var router = express.Router()
var port = 3000

mongoose.connect('mongodb://localhost/animalshelter')

// var Animal = require('../models/animal')

// app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.set('views', path.join(__dirname, 'views'))
// app.use(expressLayouts)
app.engine('ejs', require('ejs').renderFile)
app.set('view engine', 'ejs')

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

app.listen(port)
console.log('Server initiated at port ' + port)

app.get('/animals', function (req, res) {
  res.render('animals/index')
})
app.get('/animals/new', function (req, res) {
  res.render('animals/new')
})
app.get('/animals/:id', function (req, res) {
  Animal.findById(req.params.id, function (err, data) {
    res.send(data)
  })
})
app.get('/animals/:id/adopt', function (req, res) {
  Animal.findByIdAndUpdate(req.params.id, {status: 'Adopted'}, function (err, data) {
    res.send(data)
  })
})
app.get('/animals/:id/abandon', function (req, res) {
  Animal.findByIdAndUpdate(req.params.id, {status: 'Orphan'}, function (err, data) {
    res.send(data)
  })
})
app.post('/animals', function (req, res) {
  Animal.create(req.body.animal, function (err, animal) {
    if (err) {
      res.send('Something wrong happened' + err)
    } else {
      res.redirect('/animals')
    }
  })
})
