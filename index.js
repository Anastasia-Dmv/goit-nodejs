const {
  hof,
  listOfContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const argv = require("yargs").argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      hof(listOfContacts);
      break;

    case "get":
      hof(getContactById(id));
      break;

    case "add":
      hof(addContact(name, email, phone));
      break;

    case "remove":
      hof(removeContact(id));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
