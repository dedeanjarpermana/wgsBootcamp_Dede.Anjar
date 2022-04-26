const express = require ('express')
const app = express()
const cors = require('cors')
const pool = require ('./config_database')

app.use(cors())
app.use(express.json())


port = 3000


// open list semua kontak
app.get('/contacts', async(req, res) => {
  try {
      const {rows : allContacts} = await pool.query(`SELECT * FROM tb_contact`)
      res.json(allContacts)
  } catch (error) {
      console.error(err.message)
  }
})

// insert contact 
app.post('/contacts', async (req, res) => {
  try {
     
      const {name, email, mobile} = req.body
      console.log(name, email, mobile)
      
      const {rows : newContacts} = await pool.query(`INSERT INTO tb_contact (name, email, mobile) VALUES ('${name}','${email}','${mobile}') RETURNING *`)
      res.json(newContacts)
  } catch (error) {
      console.error(err.message)
  }
})

// Get Contact by ID
app.get('/contacts/:id', async (req, res) => {
  try {
      const {id} = req.params
      const {rows : contact} = await pool.query(`SELECT * FROM tb_contact WHERE id = $1`, [id])
      res.json(contact)
  } catch (error) {
      console.error(err.message)
  }
})

// Update Contact
app.put('/contacts/:id', async (req, res) => {
  try {
      
      const { updatename, updateemail, updatemobile } = req.body
      const updateContact = await pool.query(`UPDATE tb_contact SET name = '${updatename}', email = '${updateemail}', mobile = '${updatemobile}' WHERE id = '${req.params.id}'`)
      res.json("Contact succesfully  Updated")
  } catch (error) {
      console.error(err.messages)
  }
})

// Delete Contact
app.delete('/contacts/:id', async(req, res) => {
  try {
      const { id } = req.params
      const deleteContact = await pool.query(`DELETE FROM tb_contact WHERE id = $1`, [id])
      res.json('Contact succesfully  deleted')
  } catch (error) {
      console.error(err.message)
  }
})





app.listen(port, () => {
  
    console.log(`Example app listening on port http://localhost:${port}/`)
  })