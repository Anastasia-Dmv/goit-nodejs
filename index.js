const argv = require("yargs").argv;
const fs = require("fs");
const path = require("path");
const { promises: fsPromises } = fs;
const { errorHandlingWrapper } = require("./contacts");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const listOfContacts = (list) => {
  console.log(
    "listOfContacts",

    list.map((contact) => contact.name)
  );
};
const getListOfContacts = errorHandlingWrapper(listOfContacts);

const getContactById = (contactId) => (list) => {
  const contact = list.find((item) => item.id === contactId);
  console.log("getContactById", contact);
};

const removeContact = (contactId) => async (list) => {
  const contacts = list.filter((contact) => contact.id !== contactId);
  console.log(`removeContact ${contactId}`, contacts);
  await fsPromises.writeFile(contactsPath, JSON.stringify(contacts));
};

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

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      getListOfContacts;
      break;

    case "get":
      errorHandlingWrapper(getContactById(id));

      break;

    case "add":
      errorHandlingWrapper(addContact(name, email, phone));

      break;

    case "remove":
      errorHandlingWrapper(removeContact(id));

      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
