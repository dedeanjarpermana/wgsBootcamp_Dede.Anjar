const express = require('express')

const app = express()

const pool = require("./db")
app.use(express.json()) // req body
const port = 4000
// fungsi add kontak 
app.get("/addasync", async(req, res) => {
    try{
        const name = "mahardika"
        const mobile = "081220201011"
        const email = "mahardika@gmail.com"
        const newCont = await pool.query(`insert into contacts values ('${name}', '${mobile}', '${email}')returning *`)
        res.json(newCont)
    }
    catch (err) {
        console.error(err.message)
    }
})

//fungsi view list kontak
app.get("/viewlist", async (req,res) =>{
    
    try {
        const viewlist = await pool.query(`select * from contacts`)
        res.json(viewlist.rows)
    }
    catch (err) {
        console.error(err.message)
    }
})

// fungsi detail kontak berdasarkan nama
app.get("/details/:name", async (req, res) =>{
    try{
        const details = await pool.query(`select * from contacts where name = '${req.params.name}'`)
        res.json(details.rows)
    }
    catch (err) {
        console.error(err.message)
    }
})

// fungsi delete bama berdasarkan nama
app.get("/delete/:name", async (req, res) => {
    try{
        const namelist = await pool.query(`select * from contacts where name = '${req.params.name}'`)
        if(namelist.rowCount==0) {
            res.send("data tidak ada")
        }
        else {
            const details = await pool.query(`delete  from contacts where name = '${req.params.name}'`)
            res.send("data berhasil dihapus")
        }
    }
    catch (err) {
        console.error(err.message)
    }
})

//fungsi update berdasarkan nama
app.get("/update/:name",async (req, res) => {
    try{
        const mobile =  "083890908080"
        const email = "maleka@gmail.com" 
        const update = await pool.query(`update contacts set name ='${req.params.name}', mobile = '${mobile}', email = '${email}' where name = 'maleka'`)        
    }
    catch (err) {
        console.error(err.message)
    }
})

// memanggil localhost
app.listen(port,() => {
    console.log(`example app listening on port http://localhost:${port}`)
})


