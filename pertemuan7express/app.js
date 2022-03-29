const express = require('express')
const app = express()
const port = 5000


app.get('/', (req, res) => {
  // res.send('Hello World!');
  res.sendFile('./index.html', {root:__dirname})
});

app.get('/about', (req, res)=>{
  res.sendFile('./about.html', {root:__dirname})
  //res.send('hellooo post about')
  console.log("test")
  console.log("tugass")
  console.log("test")
})

app.get('/contact', (req, res)=>{
  res.sendFile('./contact.html', {root:__dirname})
  // res.send('ini adalah halaman contact')
})

app.get('/kontak', (req, res)=>{
  res.sendFile('./view/kontak.html', {root:__dirname})
  // res.send('ini adalah halaman contact')
})

app.get('/product/:id', (req, res)=>{
  res.send(`product-ID: ${req.params.id} <br> category: ${ req.query.category}`)
})

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