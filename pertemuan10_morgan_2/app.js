const express = require('express');
const { token } = require('morgan');
const app = express()
const port = 5000
var fs = require('fs')
let err_msg = '';
var morgan = require('morgan')
var path = require('path')




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
  cont =[
    {
      name:'dede ap',
      email:'d@gmail.com',
    },
    {
      name:'ghazi array',
      email:'g@yahoo.com',
    },
    {
      name:'harry P',
      email:'h@yahoo.com',
    },

  ]
const siswa = "ghazi array"
  
  res.render('index', {siswa, title:"Index pembelajan Node JS", cont })
});

app.get('/about', (req, res)=>{
  res.render('./about', {title:"about our company"})
  // res.sendFile('./about.html', {root:__dirname})
  //res.send('hellooo post about')
  
});



app.get('/contact', (req, res)=>{
  res.render('./contact', {title: "contact our homepage"})
  // res.sendFile('./contact.html', {root:__dirname}) // untuk express 
  // res.send('ini adalah halaman contact')
})

// app.get('/kontak', (req, res)=>{
//   res.sendFile('./view/kontak.html', {root:__dirname}) // untuk express 
//   // res.send('ini adalah halaman contact')
// })

// app.get('/product/:id', (req, res)=>{
//   res.send(`product-ID: ${req.params.id} <br> category: ${ req.query.category}`)
// })

app.use('/', (req, res) => {
  res.status(404)
  res.send('page not found 404')
})

// app.get('/about', (req, res) =>{
//   res.send('this page is about company');
// });

// app.get('/contact', (req, res) => {
//   res.send('welcome to my contact');
// });


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})