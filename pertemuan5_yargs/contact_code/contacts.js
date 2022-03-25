const fs = require("fs");
const readline = require('readline');
const validator = require('validator')

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

// make a function
const questions = (ask) => {
    return new Promise((resolve,rejects) =>{
        rl.question(ask, (name) => {
            resolve(name);
        })
        
    })
}

// membuaf folder
const dirPath= './data';
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath)
}

// membuat file contact.json
const dataPath = './data/contact.json';
if (!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath,'[]','utf-8')
}


const saveContact = (name, email, mobile) => {
    
    const contact = {name, email, mobile};
    const file = fs.readFileSync('data/contact.json', 'utf8');
    const contacts = JSON.parse(file);
    const duplicate=contacts.find((contact)=> contact.name===name);
    if(duplicate){
        console.log('contact name is already recorder. Use another name!');
        return false;
    }
    if(!validator.isEmail(email)){
        console.log("format email anda salah:")
        return false
    }
    

    if(!validator.isMobilePhone(mobile)){
        console.log("format hape anda salah!")
        return false
    }
    
    contacts.push(contact);
    fs.writeFileSync('data/contact.json', JSON.stringify(contacts))
    console.log(contact.name)
    console.log(name)
    console.log('terima kasih sudah memasukan data');
    rl.close()

}

module.exports = {saveContact};
