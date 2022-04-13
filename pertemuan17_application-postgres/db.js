
const Pool = require ('pg').Pool
const pool = new Pool({
    user:"postgres",
    password:"gadissuci25",
    database:'db_contact',
    host:"localhost", 
    port: 5432
})


// const getData = async (req, res) => {
//     try {
//         const query = await pool.query(`select * from contacts`)
//         res.render ('./contact', {
//             contact: query.rows, 
//             title: "View"
//         })

//     }
//     catch (error){
//         console.error("salah")
//     }
        
// };

// const getDetails = async (req, res) => {
//     try {
//         const {rows: all_contacts_query} = await pool.query(`select * from contacts where name = '${req.params.name}'`)
//         all_contacts_query.map(
//             detailContact => 
//             res.render('details', {
//                 title: "page list data ", 
//                 detailContact
//         })
//         )
//         console.log(detailContact)
//     }
//     catch (error)
//     {
//         console.error(error.message)
//     }
// };

// proses add kontak dengan database
const prosesAddContact =  async (req, res) => {
    res.render('add_contact',{
        title: "Add Contact",
        
    })
}

const addContact = async (req, res) => {
    try {
        const {rows: del_contacts_query} = await pool.query(`INSERT INTO contacts (name, mobile, email) VALUES ('${req.params.name}', '${req.params.mobile}', '${req.params.email}'`);
        add_contacts_query(
            addContact => 
            res.render('./add_contact', {
                title: "Add data ", 
                addContact
        })
        )
    }
    catch (error)
    {
        console.error(error.message)
    }
};
        
const delContact =  async (req, res) => {
    try {
        const {rows: del_contacts_query} = await pool.query(`DELETE FROM contacts WHERE name = '${req.params.name}'`)
        
    }
    catch (error)
    {
        console.error(error.message)
    }
}
        
module.exports = {pool,
                delContact,
                addContact , 
                prosesAddContact,
            }