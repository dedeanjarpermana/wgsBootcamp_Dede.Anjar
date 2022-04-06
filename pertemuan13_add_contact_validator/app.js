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
const {loadContact, details, add_kontak, checkDuplicate} = require ('./contacts.js');
const { name } = require('ejs');
const { body, validationResult, check } = require('express-validator');
const session = require ('express-session')
const flash = require ('connect-flash')
const cookieParser = require('cookie-parser')
 
app.use(express.urlencoded({extended :true}))

// information using ejs
app.set('view engine', 'ejs')
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));


app.use(cookieParser('secret'))
app.use(
  session({
    cookie : {maxAge : 6000},
    secret : 'secret',
    resave: true,
    saveUninitialized : true
  })
)
app.use(flash())
app.use((req, res, next) => {
  console.log('time', Date.now())
  next()
})

app.get('/', (req, res) => {
  // res.send('Hello World!');
  const siswa = "ghazi array"
  
  

  res.render('index', {siswa, title:"Index pembelajan Node JS"}) //cont })
});
// menuju ke page add contak html 
app.get('/contact/add', (req, res)=>{
  
  res.render('./add_contact', {title: "page tambah data"})
  
})

// proses add contak 
app.post('/contact', 
[
  body('name').custom((value)=> {
    const duplicate = checkDuplicate(value);
   
    if(duplicate){
      
      throw new Error ('Name cannot be used, already exist');
      
      
    }
    return true;
  }),

  check('email','your email address is not suitable formate').isEmail(),
  check('mobile','your mobile format is not valid ').isMobilePhone(),
], 
(req, res)=> {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    res.render('add_contact', {
      title: 'add data',
      errors: errors.array(),
    })
  } 
  else {
    
    req.flash('msg', 'data successfully added')
    add_kontak(req.body)
    res.redirect('/contact')
    
    
  // console.log(req.body)
  // res.send('new data is added')
  }
  
})


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
  res.render('details', {title: "page list data ", list_contact})
  
})




app.use('/', (req, res) => {
  res.status(404)
  res.send('page not found 404')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})