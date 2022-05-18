const db = require('./config_database')

exports.querySumBarang = async (req, res) => {
    try {
      const { rows : querysum } = await db.query('SELECT SUM(jumlah_barang) FROM tb_barang')
  
      return res.status(200).json({
        success: true,
        querysum: querysum,
      })
    } catch (error) {
      console.log(error.message) 
    }
  }