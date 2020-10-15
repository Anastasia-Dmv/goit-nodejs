const fs = require("fs");
const path = require("path");
const { promises: fsPromises } = fs;

const contactsPath = path.join(__dirname, "db", "contacts.json");
console.log("contactsPath", contactsPath);

const hof = async function (youFunc) {
  try {
    const resultData = await fsPromises.readFile(contactsPath, "utf-8");
    youFunc(resultData);
  } catch (err) {
    console.log("err", err);
  }
};

const listOfContactsInner = (resultData) => {
  const list = JSON.parse(resultData);
  console.log(
    "list",
    list.map((contact) => contact.name)
  );
};
hof(listOfContactsInner());

// const listContactsFunc = async function listContacts() {
//     try {

//       const resultData = await fsPromises.readFile(contactsPath, "utf-8");
//       const list = JSON.parse(resultData);
//       console.log(
//         "list",
//         list.map((contact) => contact.name)
//       );

//     } catch (err) {
//       console.log("err", err);
//     }
//   };

// const listContactsFunc = async function listContacts() {
//   try {
//     const resultData = await fsPromises.readFile(contactsPath, "utf-8");
//     const list = JSON.parse(resultData);
//     console.log(
//       "list",
//       list.map((contact) => contact.name)
//     );
//   } catch (err) {
//     console.log("err", err);
//   }
// };

// listContacts();
// const getContactByIdFunc = async function getContactById(contactId) {
//   try {
//     const result = await fsPromises.readFile(contactsPath, "utf-8");
//     const contact = JSON.parse(result).find(
//       (contact) => contact.id === contactId
//     );
//     console.log("contact", contact);
//   } catch (err) {
//     console.log("err", err);
//   }
// };
// // getContactById(6);
// const removeContactFunc = async function removeContact(contactId) {
//   try {
//     const result = await fsPromises.readFile(contactsPath, "utf-8");
//     const filteredContacts = JSON.parse(result).filter(
//       (contact) => contact.id !== contactId
//     );
//     console.log("filteredContacts", filteredContacts);
//   } catch (err) {
//     console.log("err", err);
//   }
// };
// // removeContact(5);
// const addContactFunc = async function addContact(name, email, phone) {
//   try {
//     const result = await fsPromises.readFile(contactsPath, "utf-8");
//     const currentData = JSON.parse(result);
//     console.log("currentData", typeof currentData);
//     const addedContacts = [
//       ...currentData,
//       {
//         id: currentData.length + 1,
//         name: name,
//         email: email,
//         phone: phone,
//       },
//     ];
//     console.log("addedContacts", addedContacts);
//     await fsPromises.writeFile(contactsPath, JSON.stringify(addedContacts));
//   } catch (err) {
//     console.log("err", err);
//   }
// };
// addContact("a", "b", "c");
module.exports = {
  listContactsFunc,
  // getContactByIdFunc,
  // removeContactFunc,
  // addContactFunc,
};
