


const readline = require('readline');

const rl =readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("what is your name:?", (name) => {
    rl.question("what is your address:?", (address)=>{
        rl.question("what is your email:", (email) =>{

    
    console.log(`thank you ${name}`)
    console.log(`your address ${address}`)
    console.log(`your email ${email}`)
    rl.close();
        })
})
})