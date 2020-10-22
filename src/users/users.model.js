
const fs = require("fs");
const path = require("path");
const { promises: fsPromises } = fs;

const contactsPath = path.join(__dirname,  "../../db/contacts.json");
console.log("contactsPath", contactsPath);
//=============================
async function errorHandlingWrapper(innerFn) {
  try {
    const resultData = await fsPromises.readFile(contactsPath, "utf-8");
    const list = JSON.parse(resultData);
    return innerFn(list);
  } catch (err) {
    console.log("err", err);
  }
}
//=====================
const listOfContacts = (list) => {
  const allContacts = list.map((contact) => contact.name)
   return allContacts;
};



const getContactById = (contactId) => async (list) => {
  const contact = list.find((item) => item.id === contactId);
   console.log("getContactById", contact);
  return contact;
}; 



const removeContact = (contactId) => async (list) => {
  const contacts = list.filter((contact) => contact.id !== contactId);
  console.log(`removeContact ${contactId}`, contacts);
  await fsPromises.writeFile(contactsPath, JSON.stringify(contacts));
   return contacts;
};


const addContact = ({name, email, phone}) => async (list) => {
  const newContact = {
        id: (list.length + 1).toString(),
        name: name,
        email: email,
        phone: phone,
      };
  const addedContacts = [
    ...list,
    newContact
  ];
  console.log("addContact", addedContacts);
  await fsPromises.writeFile(contactsPath, JSON.stringify(addedContacts));
   return  newContact;
};


const findAndUpdateContact = (contactId, contactParams) => async (list) => {
    const contactIndex = list.findIndex(contact =>contact.id ===contactId);
     if(contactIndex ===-1){
         return;
     }
      list[contactIndex]={
          ...list[contactIndex],
          ...contactParams
      }
      const addedContacts = [
        ...list,
        list[contactIndex]
      ];
     
       await fsPromises.writeFile(contactsPath, JSON.stringify(addedContacts));
     return  list[contactIndex];
}
 

module.exports = {
errorHandlingWrapper,
  listOfContacts,
  getContactById,
  removeContact,
  addContact,
  findAndUpdateContact
};















// const uuid =require('uuid');







// //  exports.saveUser = (userParams )=>{
// //      const id = uuid.v4();
// //      const createUser ={id, ...userParams};
// //      users.push(createUser);
// //      return createUser;
// //  }

// //  exports.find = ()=>{
// //      return users;
// //  }
//  getUsers = async (req, res, next) => {
    
//     const users = await getAllContacts();
//     res.status(200).send(users);
//   };