const argv = require("yargs").argv;
const { errorHandlingWrapper } = require("./utils");
const {
  getListOfContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts.controller");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const list = await getListOfContacts;
      console.table(list);
      break;

    case "get":
      const currentContact = await errorHandlingWrapper(getContactById(id));
      console.table(currentContact);
      break;

    case "add":
      const modifiedList = await errorHandlingWrapper(
        addContact(name, email, phone)
      );
      console.table(modifiedList);
      break;

    case "remove":
      const contactsAfterRemoving = await errorHandlingWrapper(
        removeContact(id)
      );
      console.table(contactsAfterRemoving);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
