const express = require('express')

const app = express()

const pool = require("./db")
app.use(express.json()) // req body
const port = 3000

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

app.get("/list", async (req,res) =>{
    
    try {
        const view = await pool.query(`select * from contacts`)
        res.json(view.rows)

    }
    catch (err) {
        console.error(err.message)
    }

})


app.get("/details/:name", async (req, res) =>{
    try{
        const details = await pool.query(`select * from contacts where name = '${req.params.name}'`)
        res.json(details.rows)
    }
    catch (err) {
        console.error(err.message)
    }
})

app.listen(port,() => {
    console.log(`example app listening on port http://localhost:${port}`)
})


