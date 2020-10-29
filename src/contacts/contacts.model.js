const fs = require("fs");
const path = require("path");
const { uuid } = require("uuidv4");
const { promises: fsPromises } = fs;

const contactsPath = path.join(__dirname, "../../db/contacts.json");

async function getCommonInfo() {
  const resultData = await fsPromises.readFile(contactsPath, "utf-8");
  const allContacts = JSON.parse(resultData);
  return allContacts;
}
const listOfContacts = async () => {
  try {
    const allContacts = await getCommonInfo();
    const result = allContacts.map((contact) => contact);
    return result;
  } catch (error) {
    throw error;
  }
};
const getContactById = async (contactId) => {
  try {
    const contacts = await getCommonInfo();
    const result = contacts.find((item) => item.id === contactId);
    return result;
  } catch (error) {
    throw error;
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await getCommonInfo();
    const contactsFiltered = contacts.filter(
      (contact) => contact.id !== contactId
    );
    await fsPromises.writeFile(contactsPath, JSON.stringify(contactsFiltered));
    return contactsFiltered;
  } catch (error) {
    throw error;
  }
};

const addContact = async ({ name, email, phone }) => {
  try {
    const contacts = await getCommonInfo();
    const newContact = {
      id: uuid(),
      name,
      email,
      phone,
    };
    const addedContacts = [...contacts, newContact];
    await fsPromises.writeFile(contactsPath, JSON.stringify(addedContacts));
    return newContact;
  } catch (error) {
    throw error;
  }
};

const findAndUpdateContact = async (contactId, contactParams) => {
  try {
    const contacts = await getCommonInfo();
    const contactIndex = contacts.findIndex(
      (contact) => contact.id === contactId
    );
    if (contactIndex === -1) {
      return;
    }
    contacts[contactIndex] = {
      ...contacts[contactIndex],
      ...contactParams,
    };
    const addedContacts = [...contacts, contacts[contactIndex]];

    await fsPromises.writeFile(contactsPath, JSON.stringify(addedContacts));
    return contacts[contactIndex];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  listOfContacts,
  getContactById,
  removeContact,
  addContact,
  findAndUpdateContact,
};
