

const Pool = require ('pg').Pool
const pool = new Pool({
    user:"postgres",
    password:"gadissuci25",
    database:'db_contact',
    host:"localhost",
    port: 5432
})

module.exports = pool