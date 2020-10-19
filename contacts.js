const fs = require("fs");
const path = require("path");
const { promises: fsPromises } = fs;

const contactsPath = path.join(__dirname, "db", "contacts.json");
console.log("contactsPath", contactsPath);
//=============================
async function errorCatchingFunction(youFunc) {
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


//==================
const getContactById = (contactId) => (list) => {
  const contact = list.find((item) => item.id === contactId);
  console.log("getContactById", contact);
};



//=============================

const removeContact = (contactId) => async (list) => {
  const contacts = list.filter((contact) => contact.id !== contactId);
  console.log(`removeContact ${contactId}`, contacts);
  await fsPromises.writeFile(contactsPath, JSON.stringify(contacts));
};


//==================
const addContact = (name, email, phone) => async (list) => {
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


const getListOfContacts = errorCatchingFunction(listOfContacts)
// const getSomeContactById(id) = errorCatchingFunction(getContactById(id));
// const removeSomeContact = errorCatchingFunction(removeContact);
// const addSomeContact =  errorCatchingFunction(addContact);
module.exports = {
  getListOfContacts,
  // getSomeContactById,
  // removeSomeContact,
  // addSomeContact,
  errorCatchingFunction, 
  getContactById,
  removeContact, 
  addContact

 
};

