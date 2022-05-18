const db = require('../db')

exports.getUser = async (req, res) => {
    try {
      const { rows : users } = await db.query('SELECT * FROM users')
  
      return res.status(200).json({
        success: true,
        users: users,
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  exports.getUserbyId = async (req, res) => {
    try {
      const { user_id } = req.params
      const { rows : user } = await db.query(`SELECT * FROM users where user_id = ${user_id}`)
  
      return res.status(200).json({
        success: true,
        users: user,
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  exports.deleteUser = async (req, res) => {
    try {
      const { user_id } = req.params
      const { rows : user } = await db.query(`DELETE FROM users WHERE user_id = ${user_id}`)

  
      return res.status(200).json({
        success: true,
        users: user,
      })
    } catch (error) {
      console.log(error.message)
    }
  }
 
  exports.updateUser = async (req, res) => {
    try {
      const { user_id } = req.params
      const { updateNama, updateEmail, updateFoto, updateRole} = req.body
      const { rows : user } = await db.query(`UPDATE users SET nama = '${updateNama}', email = '${updateEmail}', foto = '${updateFoto}', role = '${updateRole}' WHERE user_id = ${user_id}`)

  
      return res.status(200).json({
        success: true,
        users: user,
      })
    } catch (error) {
      console.log(error.message)
    }
  }