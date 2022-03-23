
const readline = require('readline');
const masukan = readline.createInterface({
    input : process.stdin,
    output:process.stdout
})

masukan.question("what is your name?: ", (nama)=>{
let name = nama
masukan.question("what is your hobby?:", (hobby)=>{
let hobi = hobby
masukan.question("what is yoru activity now?:", (activity)=>{
let kegiatan = activity
console.log(`Hai ${nama}, yang punya hobby ${hobby}, dengan kegiatan ${activity}`)
        masukan.close()
    })
})
})

