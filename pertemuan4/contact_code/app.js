

// const fs = require("fs");
// const { resolve } = require("path/posix");
// const readline = require('readline');
// const { json } = require("stream/consumers");


// const rl = readline.createInterface({
//     input:process.stdin,
//     output:process.stdout
// });

// // make a function
// const questions = (ask) => {
//     return new Promise((resolve,rejects) =>{
//         rl.question(ask, (name) => {
//             resolve(name);
//         })
        
//     })
// }


// const main = async() => {
//     const name = await questions("what is your name?");
//     const mobile = await questions("your mobile phone");
//     const contact = {name, mobile};
//     const file = fs.readFileSync('data/contact.json', 'utf8');
//     const contacts = JSON.parse(file);
//     contacts.push(contact);
//     fs.writeFileSync('data/contact.json', JSON.stringify(contacts))
//     console.log('terima kasih sudah memasukan data');
//    rl.close()

// }


// //         // const contact = [name, mobile];
// //         // membuaf folder
// //         // const dirPath= './data';
// //         // if(!fs.existsSync(dirPath)){
// //         //     fs.mkdirSync(dirPath)
// //         // }

// //         // // membuat file contact.json
// //         // const dataPath = './data/contact.json';
// //         // if (!fs.existsSync(dataPath)){
// //         //     fs.writeFileSync(dataPath,'[]','utf-8')
// //         // }


        
// // })

// main();


const contacts  = require ('./contacts');

const main = async() => {
    const name = await contacts.questions("what is your name?");
    const email = await contacts.questions("your email address");
    const mobile = await contacts.questions('what is your number');

    contacts.saveContact(name, email,mobile)
}

main();