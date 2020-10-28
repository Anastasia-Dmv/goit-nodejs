const fs = require("fs");
const path = require("path");
const { uuid } = require("uuidv4");
const { errorHandlingWrapper } = require("./utils");
const { promises: fsPromises } = fs;

const contactsPath = path.join(__dirname, "db", "contacts.json");

const listOfContacts = (list) => {
  const contactsList = list.map((contact) => contact);
  return contactsList;
};
const getListOfContacts = errorHandlingWrapper(listOfContacts);
const getContactById = (contactId) => (list) => {
  const contact = list.find((item) => item.id === contactId);
  return contact;
};

const removeContact = (contactId) => async (list) => {
  const contacts = list.filter((contact) => contact.id !== contactId);
  await fsPromises.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts;
};

const addContact = (name, email, phone) => async (list) => {
  const addedContacts = [
    ...list,
    {
      id: uuid(),
      name,
      email,
      phone,
    },
  ];
  await fsPromises.writeFile(contactsPath, JSON.stringify(addedContacts));
  return addedContacts;
};
module.exports = {
  addContact,
  removeContact,
  getContactById,
  getListOfContacts,
};
