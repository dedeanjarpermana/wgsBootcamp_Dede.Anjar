// memanggil module yargs

const all_contacts  = require ('./contacts.js');
const yargs = require('yargs');

//membuat command add
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
        all_contacts.saveContact(argv.name, argv.email,argv.mobile);
        const contact = { 
            name:argv.name, 
            email:argv.email,
            mobile:argv.mobile,
        };
        console.log(contact);
    },
});




// membuat command list contact
yargs.command({
    command:'list',
    describe:'see contact list',
    handler(){
        all_contacts.listContact();
    },
});

// membuat command detail
yargs.command({
    command:'details',
    describe:'details list name, email and mobile phone',
    builder:{
        name:{
            demandOption:true,
            type:'string',
        },
    },
    
    handler(argv){ 
        all_contacts.details(argv.name);
        const contact = { 
            name:argv.name,
        };
        console.log(contact);
    },
});

// membuat command delete 
yargs.command({
    command:'delete',
    describe:'delete a list based on a name',
    builder:{
        name:{
            demandOption:true,
            type:'string',
        },
    },
    
    handler(argv){ 
        all_contacts.deleteContact(argv.name);
        const contact = { 
            name:argv.name,
            
        };
        //console.log("helllow ini delete contact");
        
    },
});



yargs.parse();
// =========================

// =======================



// // program utama yang berjalan
// const contacts  = require ('./contacts');

// const main = async() => {
//     const name = await contacts.questions("what is your name? : ");
//     const email = await contacts.questions("your email address? : ");
//     const mobile = await contacts.questions('what is your number? :');

//     contacts.saveContact(name, email,mobile)
// }
//main();

