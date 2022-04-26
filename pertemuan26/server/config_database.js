const Pool = require ('pg').Pool

const pool = new Pool({
    user: 'postgres',
    password:'gadissuci25',
    port: 5432,
    database: 'database_contacts'
})

module.exports = pool