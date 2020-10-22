
const fs = require("fs");
const path = require("path");
const { promises: fsPromises } = fs;

const contactsPath = path.join(__dirname,  "../../db/contacts.json");
console.log("contactsPath", contactsPath);
//=============================
async function hof(youFunc) {
  try {
    const resultData = await fsPromises.readFile(contactsPath, "utf-8");
    const list = JSON.parse(resultData);
    return youFunc(list);
  } catch (err) {
    console.log("err", err);
  }
}
//=====================
const listOfContacts = (list) => {
  console.log(
    "listOfContacts",
    //list
    list.map((contact) => contact.name)
  );
};
// hof(listOfContacts);

//==================
const getContactById = (contactId) => (list) => {
  const contact = list.find((item) => item.id === contactId);
  console.log("getContactById", contact);
};

// hof(getContactById(6));

//=============================

const removeContact = (contactId) => async (list) => {
  const contacts = list.filter((contact) => contact.id !== contactId);
  console.log(`removeContact ${contactId}`, contacts);
  await fsPromises.writeFile(contactsPath, JSON.stringify(contacts));
};

// hof(removeContact(12));
//==================
const addContact = ({name, email, phone}) => async (list) => {
  const addedContacts = [
    ...list,
    {
      id: list.length + 1,
      name: name,
      email: email,
      phone: phone,
    },
  ];
  console.log("addContact", addedContacts);
  await fsPromises.writeFile(contactsPath, JSON.stringify(addedContacts));
};

// hof(addContact("a", "b", "c"));

//=================================
module.exports = {
  hof,
  listOfContacts,
  getContactById,
  removeContact,
  addContact,
};
//==========================














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