const fs = require("fs");
const readline = require('readline');
const validator = require('validator');



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


// memuat fungsi load contact
const loadContact = () => {
    const file = fs.readFileSync('data/contact.json', 'utf-8');
    const contacts = JSON.parse(file);
    return contacts;
}


const saveContact = (contacts) => {
    fs.writeFileSync('data/contact.json', JSON.stringify(contacts))
};

const add_kontak = (contact) => {
    const contacts = loadContact()
    contacts.push(contact)
    saveContact(contacts)

}
    
//     const newContact = {name, email, mobile};
//     file = fs.readFileSync('data/contact.json', 'utf8');
//     all_contacts = JSON.parse(file);
//     const duplicate=all_contacts.find((newContact)=> newContact.name===name);
//     if(duplicate){
//         console.log('contact name is already recorder. Use another name!');
//         return false;
//     }
//     if(!validator.isEmail(email)){
//         console.log("format email anda salah:")
//         return false
//     }
    
//     if(!validator.isMobilePhone(mobile, 'id-ID')){
//         console.log("format hape anda salah!")
//         return false
//     }
    
//     all_contacts.push(newContact);
//     fs.writeFileSync('data/contact.json', JSON.stringify(all_contacts))
//     console.log(newContact.name)
//     console.log(name)
//     console.log('terima kasih sudah memasukan data');
//     rl.close();

// };
// membuat fungsi list contact
const listContact = () => {
    const contacts_List = loadContact();
    console.log('contact list : ');
    contacts_List.forEach((contacts_List,i )=> {
        console.log(`${i+1}.${contacts_List.name}-${contacts_List.email}-${contacts_List.mobile}`);
        
    });
};

// membuat fungsi detail
const details = (name) => {
    const all_contacts = loadContact();
    const InformationDetail = all_contacts.find((contactName) => contactName.name === name)
    return InformationDetail;

};
// membuat fungsi delete

const deleteContact =(name) =>{
    const all_contacts = loadContact();
    const newContact = all_contacts
    const listBaru = newContact.filter((newContact) => newContact.name !== name)
    if (newContact.length === listBaru.length){
        console.log(`${name},  tidak ditemukan`)
        return false
    }
    fs.writeFileSync('data/contact.json', JSON.stringify(listBaru))
    console.log(`data ${name} successfully deleted`)
    }

module.exports = {
    saveContact,
    listContact,
    details, 
    deleteContact, 
    loadContact,
    add_kontak
};
