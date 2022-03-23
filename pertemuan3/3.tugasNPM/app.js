


const { RSA_X931_PADDING } = require('constants');
const readline = require('readline');
const validator = require('validator')

const rl =readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("what is your name:?", (name) => {
    rl.question("what is your mobile phone? ", (phone) =>{
        if(validator.isMobilePhone(phone, 'id-ID')=== true){
            rl.question("what is your email-address?", (email) => {
                if(validator.isEmail(email) === true){
                    console.log("----------------------------")
                    console.log(`your name is: ${name}`)
                    console.log(`your mobile phone is: ${phone}`)
                    console.log(`your email address is: ${email}`)
                    rl.close()
                }
            
                
            
                else{
                    console.log("Your email is not correct!")
                    rl.close()
                }
            })
        }
        else{
            console.log("your mobile phone is not correct!")
            rl.close()
       
    }
})
})
