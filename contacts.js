const fs = require("fs");
const path = require("path");
const { promises: fsPromises } = fs;

const contactsPath = path.join(__dirname, "db", "contacts.json");
console.log("contactsPath", contactsPath);

// async function listContacts() {
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
// }
// listContacts();
// async function getContactById(contactId) {
//   try {
//     const result = await fsPromises.readFile(contactsPath, "utf-8");
//     const contact = JSON.parse(result).find(
//       (contact) => contact.id === contactId
//     );
//     console.log("contact", contact);
//   } catch (err) {
//     console.log("err", err);
//   }
// }
// getContactById(6);
// async function removeContact(contactId) {
//   try {
//     const result = await fsPromises.readFile(contactsPath, "utf-8");
//     const filteredContacts = JSON.parse(result).filter(
//       (contact) => contact.id !== contactId
//     );
//     console.log("filteredContacts", filteredContacts);
//   } catch (err) {
//     console.log("err", err);
//   }
// }
// removeContact(5);
// async function addContact(name, email, phone) {
//   try {
//     const result = await fsPromises.readFile(contactsPath, "utf-8");
//     const currentData = JSON.parse(result);

//     const addedContacts = currentData.push({
//       id: 13,
//       name: name,
//       email: email,
//       phone: phone,
//     });
//     const resultFinished = await fsPromises.writeFile(
//       contactsPath,
//       addedContacts
//     );
//     console.log("resultFinished", resultFinished);
//   } catch (err) {
//     console.log("err", err);
//   }
// }
// addContact("a", "b", "c");
