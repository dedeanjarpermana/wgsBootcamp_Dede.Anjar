const express = require('express');
const { token } = require('morgan');
const app = express()
const port = 5000
var fs = require('fs')
let err_msg = '';
var morgan = require('morgan')
var path = require('path')
var file = __dirname + '/contact.json';
var http = require ('http');
const {loadContact, details} = require ('./contacts.js');

// information using ejs
app.set('view engine', 'ejs')
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
  console.log('time', Date.now())
  next()
})

app.get('/', (req, res) => {
  // res.send('Hello World!');
  const siswa = "ghazi array"
  
  

  res.render('index', {siswa, title:"Index pembelajan Node JS"}) //cont })
});

app.get('/about', (req, res)=>{
  res.render('./about', {title:"about our company"})
  // res.sendFile('./about.html', {root:__dirname})
  //res.send('hellooo post about')
  
});



app.get('/contact', (req, res)=>{
  var list_contact = loadContact();
  res.render('./contact', {title: "contact our homepage", list_contact})
  
})

app.get('/contact/:name', (req, res)=>{
  const list_contact = details(req.params.name)
  res.render('details', {title: "contact our homepage", list_contact})
  
})


app.use('/', (req, res) => {
  res.status(404)
  res.send('page not found 404')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})