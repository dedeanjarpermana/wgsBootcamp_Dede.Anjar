const Pool = require ('pg').Pool

const pool = new Pool({
    user: 'postgres',
    password:'gadissuci25',
    port: 5432,
    database: 'db_gudang'
})


module.exports = {
    query: (text, params) => pool.query(text, params),
  }