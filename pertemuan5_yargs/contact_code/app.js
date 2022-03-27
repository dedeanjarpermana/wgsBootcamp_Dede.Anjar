// memanggil module yargs

const contacts  = require ('./contacts.js');
const yargs = require('yargs');

//console.log(yargs.argv);
yargs.command({
    
    command:'add',
    describe: 'add new contact',
    builder:{ 
        name:{
            describe:'Contact name',
            demandOption:true, //require data, kalau true harus ada data, kalau tidak ada yargs akan menolak
            type:'string',
        },
        email:{
            describe:'contact email',
            demandOption:false,
            type:'string',
        },
        mobile:{
            describe:'contact mobile phone number',
            demandOption:true,
            type:'string',
        },
    },
    handler(argv){ // argv adalah seperti argumen / nilai return
        contacts.saveContact(argv.name, argv.email,argv.mobile);
        const contact = { 
            name:argv.name, 
            email:argv.email,
            mobile:argv.mobile,
        };
        console.log(contact);
    }
});

yargs.parse();


// // program utama yang berjalan
// const contacts  = require ('./contacts');

// const main = async() => {
//     const name = await contacts.questions("what is your name? : ");
//     const email = await contacts.questions("your email address? : ");
//     const mobile = await contacts.questions('what is your number? :');

//     contacts.saveContact(name, email,mobile)
// }
//main();

