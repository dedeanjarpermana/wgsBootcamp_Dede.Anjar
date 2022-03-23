


const readline = require('readline');
const validator = require('validator')

const rl =readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("what is your name:?", (name) => {
    
    rl.question("what is your mobile phone:?", (phone)=>{
        console.log(validator.isMobilePhone(phone, 'id-ID'))
        rl.question("what is your email:", (email) =>{
            console.log(validator.isEmail(email))

    
    console.log(`thank you ${name}`)
    console.log(`your mobile phone ${phone}`)
    console.log(`your email ${email}`)
    rl.close();
        })
})
})