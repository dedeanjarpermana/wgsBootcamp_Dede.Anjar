const db = require('../db')

exports.getBarang = async (req, res) => {
    try {
      const { rows : barang } = await db.query('SELECT * FROM barang')
  
      return res.status(200).json({
        success: true,
        barang: barang,
      })
    } catch (error) {
      console.log(error.message) 
    }
  }

  exports.stok_barang = async (req, res) => {
    const { nama_barang, ket_barang, stok_barang } = req.body
    try {
  
      await db.query('INSERT INTO barang (nama_barang, ket_barang, stok_barang) values ($1 , $2, $3)', [ nama_barang, ket_barang, stok_barang])
  
      return res.status(201).json({
        success: true,
        message: 'Tambah Data Barang Selesai',
      })
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({
        error: error.message,
      })
    }
  }