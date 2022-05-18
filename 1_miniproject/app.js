const express = require('express');
const app = express()
const port = 3700
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
var path = require('path')
app.set('view engine', 'ejs')
const logger = require('express-log-psql'); // morgan to postgress
app.use(express.urlencoded({extended :true}))
require('dotenv').config()
const multer = require("multer"); // buat aplod foto

const upload = multer({ dest: 'uploads/' })





var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' }) // morgan to file
app.use(morgan('combined', { stream: accessLogStream }))


app.use(express.static(__dirname + '/public'));
app.use(flash())
app.use(cookieParser('secret'))
app.use(
  session({
    
    secret : 'secret',
    resave: false,
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
// morgan to postgres
app.get('/logs', (req, res) => {
  logger.retrieveDB({
      find: [],
      sort: ['date DESC']
  }).then((results) => {
      res.json(results);
  }).catch((err) => res.status(500).json(err));
});


// app.post('/profile', upload.single('avatar'), function (req, res, next) {
//   // req.file is the `avatar` file
//   // req.body will hold the text fields, if there were any
// })

// app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
//   // req.files is array of `photos` files
//   // req.body will contain the text fields, if there were any
// })

// const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
// app.post('/cool-profile', cpUpload, function (req, res, next) {
//   // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
//   //
//   // e.g.
//   //  req.files['avatar'][0] -> File
//   //  req.files['gallery'] -> Array
//   //
//   // req.body will contain the text fields, if there were any
// })



// halaman Home
app.get('/', (req, res) => {
  
  res.render('index.ejs', 
  {title: "Index, Gate Utama masuk",
    
  })
})


// go to home page user
app.get('/home', checkNotAuthenticated, (req, res) => {
  res.render('home.ejs', 
  {title: "HOMEE", 
  user: req.user.username,
  role:req.user.role})
})

// go to page user barang masuk
app.get('/user/barang_masuk', checkNotAuthenticated, (req, res) => {
  res.render('barang_add.ejs', 
  {title: "barang masuk", 
  user: req.user.username,
  role:req.user.role})
})

// proses input ke barang masuk


// go to page user barang keluar
app.get('/user/barang_keluar', checkNotAuthenticated, (req, res) => {
  res.render('barang_out.ejs', 
  {title: "barang masuk", 
  user: req.user.username,
  role:req.user.role})
})


// proses login user
app.post("/login/auth",
  passport.authenticate("local", {
    
    successRedirect: "/home",
    failureRedirect: "/",
    failureFlash: true
  })
);

// go to admin page home
app.get('/admin_page', checkNotAuthenticated, (req, res) => {
  res.render('admin_page.ejs', {title: "Home of Admin",user: req.user.username,
  role:req.user.role})
})


// route to page tambah barang
app.get('/admin/tambah_barang',  checkNotAuthenticated,(req,res) =>{
  res.render('add_barang.ejs', {title:'tambah barang', user: req.user.username,
  role:req.user.role})
})

// proses tambah barang
app.post('/admin/tambah_barang', async (req, res) => {
  let {id_barang, nama_barang, jumlah_barang, harga_barang, id_penginput} = req.body
  
  
  let errors = []
  // pool.query(`INSERT INTO tb_barang (id_barang, nama_barang, jumlah_barang, harga_barang, photo) VALUES ('${id_barang}', '${nama_barang}', '${jumlah_barang}', '${harga_barang}', '${photo}')`, (err, results) => {
  //   if (err) {
  //     throw err;
  //   }
  //   console.log(results.rows);
  //   req.flash("success_msg", "Data berhasil ditambah");
  //   res.redirect('/admin/barang');
  // });
  
  if(!id_barang || !nama_barang || !jumlah_barang || !harga_barang || !id_penginput){
     errors.push({message: "silahkan isi semua kolomnya"})
    
  } else {
    pool.query(`INSERT INTO tb_barang (id_barang, nama_barang, jumlah_barang, harga_barang, id_penginput) VALUES ('${id_barang}', '${nama_barang}', '${jumlah_barang}', '${harga_barang}', '${id_penginput}')`, (err, results) => {  
    //console.log(results.rows);
    req.flash("success_msg", "Data berhasil ditambah");
    res.redirect('/barang');
    });
  } 
})

// route to page tambah user
app.get('/admin/tambah_user', (req,res) =>{
  res.render('tambah_user.ejs', {title:'tambah user', 
  //user: req.user.username,
  // role: req.user.role
})
})


//register admin prosees
app.post('/admin/tambah_user', checkNotAuthenticated, async (req, res) => {
  let {username, name, email, password, password2, role} = req.body
 
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
    

    pool.query(`select * from tb_user where email = $1`, 
    [email], (err, results)=> {
      if (err) {
        throw err;
      }
      
      if (results.rows.length > 0) {
        return res.render("admin_register", {
          message: "Email already registered", title: 'proses register sudah digunakan'
        });
      } else {
        pool.query(
          `INSERT INTO tb_user (username, name, email, password, role)
              VALUES ('${username}', '${name}', '${email}', '${hashedPassword}','${role}')
              `,
          
          (err, results) => {
            if (err) {
              throw err;
            }
            console.log(results.rows);
            req.flash("success_msg", "You are now registered. Please log in");
            res.redirect('/admin/list_user');
          }
        );
      } 
    })
  }
})

// halaman informasi user personal
app.get('/informasi_user', checkNotAuthenticated, async (req, res) => {
  try {
      const username = req.body
      
      const {rows : users } = await pool.query(`SELECT * FROM tb_user ` )
      res.render ('informasi_user.ejs', {
        title: 'informasi user', 
        users,
        msg: req.flash('msg'), 
        user: req.user.username,
        role:req.user.role,
        email: req.user.email,
        name : req.user.name
      })
      
  }catch (err) {
      console.error(err.message)
  }
})



// memangggil view list dari database user
app.get("/barang", checkNotAuthenticated, async (req, res) => {
  try {
    const {rows : barang } = await pool.query(`SELECT tb_barang.id_barang, tb_barang.nama_barang, tb_barang.jumlah_barang, tb_user.username, tb_user.name
    FROM tb_barang INNER JOIN tb_user ON tb_barang.id_penginput = tb_user.username;
    `)
      res.render ('barang.ejs', {
          barang,
          title: "data  semua barang ",
          msg: req.flash('msg'),
          user: req.user.username,
          role:req.user.role
          
      })
  }
  catch (error){
      console.error("salah")
  }
})

// proses untuk mendapatkan detail pada list barang
app.get("/barang/:name", checkNotAuthenticated, async (req, res) => {
  try {
    const name = (req.params.name)
    const {rows : barang }  = await pool.query(`SELECT *  FROM tb_barang where id_barang = '${name}'`)
    barang.map(
      detailBarang => 
      res.render('details', {
      title: "page detail data ", 
      detailBarang,
      user: req.user.username,
      role:req.user.role
      })
      )
  }
  catch (error){
      console.error("salah")
  }   
})



// memangggil view list user dari database user
app.get("/admin/list_user", checkNotAuthenticated, async (req, res) => {
  try {
    const {rows : list_user } = await pool.query(`select * from tb_user`)
      res.render ('list_user.ejs', {
          list_user,
          title: "data  semua member ",
          msg: req.flash('msg'),
          user: req.user.username,
          role:req.user.role
          
      })
  }
  catch (error){
      console.error("salah")
  }
})

// prose untuk mendapatkan detail dari list user
app.get("/admin/list_user/:username", checkNotAuthenticated, async (req, res) => {
  try {
    const username = (req.params.username)
    const {rows : list_user }  = await pool.query(`SELECT *  FROM tb_user where username = '${username}'`)
    list_user.map(
      detailUser => 
      res.render('details_user.ejs', {
      title: "page detail users ", 
      detailUser,
      user: req.user.username,
      role:req.user.role
      })
      )
  }
  catch (error){
      console.error("salah")
  }   
})



//detail barang admn
// memangggil view list dari database user
app.get("/admin/barang", checkNotAuthenticated, async (req, res) => {
  try {
    const {rows : barang } = await pool.query(`select * from tb_barang`)
      res.render ('admin_barang.ejs', {
          barang,
          title: "data  semua barang ",
          msg: req.flash('msg'), 
          user: req.user.username,
          role:req.user.role   
      })
  }
  catch (error){
      console.error("salah")
  }
})

app.get("/admin/barang/:name", checkNotAuthenticated, async (req, res) => {
  try {
    const name = (req.params.name)
    const {rows : barang }  = await pool.query(`SELECT *  FROM tb_barang where id_barang = '${name}'`)
    barang.map(
      detailBarang => 
      res.render('details_admin', {
      title: "page detail data ", 
      detailBarang
      })
      )
  }
  catch (error){
      console.error("salah")
  }   
})

//Proses Update user
app.post('/admin/list_user/update', [
  body('name').custom(async(value, {req}) => {
      const duplikat = await pool.query(`SELECT username FROM tb_user WHERE username = '${value}'`)
      if(!value === req.body.oldUsername && duplikat) {
          throw new Error('Nama contact sudah digunakan')
      }
      return true
  }),
  
], 
  async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
      res.render('edit_user', {
          title : 'Form Ubah Contact',
          
          errors : errors.array(),
          userEdit : req.body,
      })
  }
  else {
      const{username, name, email, password, role} = req.body
      await pool.query(`UPDATE tb_user SET username = '${username}', name = '${name}', email = '${email}' , role= '${role}' where username = '${req.body.oldUsername}' `)
      req.flash('msg', 'Data contact berhasil di Update')
      res.redirect('/contact')
  }
})


// Untuk route Edit/update user by username
app.get('/admin/user_edit/:username', async (req, res) => {
  try{
      const username = (req.params.username)
      const {rows : user} = await pool.query(`SELECT * FROM tb_user WHERE name = '${username}'`)
      user.map(userEdit => {
          res.render('edit_user', {
              title : "Page List Detail update",
              userEdit
          })
      })
  }
  catch (err) {
      console.error(err.message)
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
  res.redirect("/");
}



app.get("/logout", (req, res) => {
  req.logout();
  res.render("index.ejs", { message: "You have logged out successfully" , title:"logout"});
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