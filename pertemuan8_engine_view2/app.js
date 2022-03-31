const express = require('express')
const app = express()
const port = 5000
let err_msg = '';

// information using ejs
app.set('view engine', 'ejs')



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
  
  res.render('index', {siswa, title:"pembelajan Node JS", cont,  err_msg: err_msg })
});

app.get('/about', (req, res)=>{
  res.render('./about')
  // res.sendFile('./about.html', {root:__dirname})
  //res.send('hellooo post about')
  
});



app.get('/contact', (req, res)=>{
  res.render('./contact')
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