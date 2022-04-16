const express = require('express');
const app = express()
const port = 3000
const {pool} = require("./db")
var session = require('express-session')
var fs = require('fs')
const { body, validationResult, check } = require('express-validator');
const morgan = require('morgan') // morgan
const Writable = require("stream").Writable
morgan.token("custom", "-method: :method -endpoint: :url -status: status")
const flash = require ('connect-flash')
const cookieParser = require('cookie-parser');
const { title } = require('process');
const bcrypt = require('bcrypt')
const passport = require('passport')
const fileUpload = require('express-fileupload')
const initializePassport = require('./passportConfig')
initializePassport(passport)
var path = require('path') // morgan
app.set('view engine', 'ejs')
const logger = require('express-log-psql'); // morgan to postgress
app.use(express.urlencoded({extended :true}))
require('dotenv').config()

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' }) // morgan to file
app.use(morgan('combined', { stream: accessLogStream }))


app.use(express.static(__dirname + '/public'));
app.use(flash())
app.use(cookieParser('secret'))
app.use(
  session({
    cookie : {maxAge : 6000},
    secret : 'secret',
    resave: true,
    saveUninitialized : false,
  })
)
app.use(passport.initialize())
app.use(passport.session())
//morgan to postgress
app.use(logger('tiny', {
  url: 'postgresql://dbuser:gadissuci25@localhost:5432/db_gudang',
  table: 'logs'
}));

app.get('/logs', (req, res) => {
  logger.retrieveDB({
      find: [],
      sort: ['date DESC']
  }).then((results) => {
      res.json(results);
  }).catch((err) => res.status(500).json(err));
});
// halaman Home
app.get('/',  (req, res) => {
  res.render('index.ejs', {title: "Index, Gate Utama masuk"})
})

//cheking home kalo ga di dalam session
app.get('/',  checkNotAuthenticated, (req, res) => {
  res.render('index.ejs', {title: "Index"})
})
// go to home page user
app.get('/home',  (req, res) => {
  res.render('home.ejs', {title: "HOMEE"})
})

// direct ke login page
app.get("/login/auth", checkAuthenticated, (req, res) => {
  
  // console.log(req.session.flash.error);
  res.render("login.ejs", {title: 'login user'});
});

// proses login user
app.post("/login/auth",
  passport.authenticate("local", {
    
    successRedirect: "/home",
    failureRedirect: "/login/auth",
    failureFlash: true
  })
);

// go to admin page home
app.get('/admin_page',  (req, res) => {
  res.render('admin_page.ejs', {title: "Home of Admin"})
})

// direct ke login admin page
app.get('/login_admin', checkAuthenticated, (req, res) => {
  
  res.render('login_admin.ejs', {title: "login admin"})
})

// proses login admin
app.post("/login_admin",
  passport.authenticate("local", {
    successRedirect: "/admin_page",
    failureRedirect: "/login/auth",
    failureFlash: true
  })
);
// route to page tambah barang
app.get('/admin/tambah_barang', (req,res) =>{
  res.render('add_barang.ejs', {title:'tambah barang'})
})

// proses tambah barang
app.post('/admin/tambah_barang', async (req, res) => {
  // let {id_barang, nama_barang, jumlah_barang, harga_barang, photo} = req.body
  
  let errors = []
  // if(!id_barang || !nama_barang || !jumlah_barang|| !harga_barang || !photo){
  //    errors.push({message: "silahkan isi semua kolomnya"})
  // }
  if(req.method == "POST"){
    var post  = req.body;
    var id_barang = post.id_barang;
    var nama_barang= post.nama_barang;
    var jumlah_barang= post.jumlah_barang;
    var harga_barang= post.harga_barang;

  if (!req.files)
      return res.status(400).send('No files were uploaded.');

  var file = req.files.uploaded_image;
  var photo=file.name;

     if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
                               
            file.mv('public/images/upload_images/'+file.name, function(err) {
                           
              if (err)

                return res.status(500).send(err);
              var sql = "INSERT INTO `tbl_barang`(`id_barang`,`nama_barang`,`jumlah_barang`,`harga_barang`, `photo`) VALUES ('" + id_barang + "','" + nama_barang + "','" + jumlah_barang + "','" + harga_barang + "','" + photo + "')";

              var query = db.query(sql, function(err, result) {
                 res.redirect('profile/'+result.insertId);
              });
           });
        } else {
          message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
          res.render('index.ejs',{message: message});
        }
 } else {
    res.render('index');
 }

    
      
})

// route to page tambah user
app.get('/admin/tambah_user', (req,res) =>{
  res.render('tambah_user.ejs', {title:'tambah user'})
})


//register admin prosees
app.post('/admin/tambah_user', async (req, res) => {
  let {username, name, email, password, password2} = req.body
  console.log({username, name, email, password, password2})
  let errors = []
  if(!username || !name || !email || !password || !password2){
     errors.push({message: "silahkan isi semua kolomnya"})
  }
  if(password < 6){
    errors.push({message: 'untuk mengisi password minimal 6 karakter yang harus diisi'})
  }
  if(password != password2){
    errors.push({message: 'your password is not match'})
  }
  if(errors.length >0) {
    res.render('admin_register.ejs', {errors, title:'proses register'})
  } else {
    let hashedPassword = await bcrypt.hash(password, 10)
    console.log(hashedPassword)

    pool.query(`select * from tb_user where email = $1`, 
    [email], (err, results)=> {
      if (err) {
        throw err;
      }
      console.log('reachers here')
      console.log(results.rows)
      if (results.rows.length > 0) {
        return res.render("admin_register", {
          message: "Email already registered", title: 'proses register sudah digunakan'
        });
      } else {
        pool.query(
          `INSERT INTO tb_user (username, name, email, password)
              VALUES ($1, $2, $3, $4)
              `,
          [username,name, email, hashedPassword],
          (err, results) => {
            if (err) {
              throw err;
            }
            console.log(results.rows);
            req.flash("success_msg", "You are now registered. Please log in");
            res.redirect('/login_admin');
          }
        );
      } 
    })
  }
})

// halaman informasi user
app.get('/informasi_user', checkAuthenticated, async (req, res) => {
  try {
      const username = req.body
      const {rows : user } = await pool.query(`SELECT * FROM tb_user` )
      
      res.render ('informasi_user.ejs', {
        title: 'informasi user', 
        user,
        msg: req.flash('msg')
      })
      
  }catch (err) {
      console.error(err.message)
  }
})

// memangggil view list dari database (assincronus)
app.get("/barang", checkAuthenticated, async (req, res) => {
  try {
    const {rows : barang } = await pool.query(`select * from tb_barang`)
      res.render ('barang.ejs', {
          barang,
          title: "data  semua barang ",
          msg: req.flash('msg')   
      })
  }
  catch (error){
      console.error("salah")
  }
})

app.get("/barang/:name", checkAuthenticated, async (req, res) => {
  try {
    const name = (req.params.name)
    const {rows : barang }  = await pool.query(`SELECT *  FROM tb_barang where id_barang = '${name}'`)
    barang.map(
      detailBarang => 
      res.render('details', {
      title: "page detail data ", 
      detailBarang
      })
      )
  }
  catch (error){
      console.error("salah")
  }   
})

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login/auth");
}



app.get("/logout", (req, res) => {
  req.logout();
  res.render("login.ejs", { message: "You have logged out successfully" , title:"logout"});
});


app.use('/', (req, res) => {
  res.status(404)
  // res.send('page not found 404')
})

class MyStream extends Writable {
  write(line) {
  //here you send the log line to wherever you need
     console.log("Logger:: ", line)
  }
}
let writer = new MyStream()



app.listen(port, () => {
  
  console.log(`Example app listening on port http://localhost:${port}/`)
})