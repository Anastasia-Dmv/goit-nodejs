const {
  getListOfContacts,
  // getSomeContactById,
  // removeSomeContact,
  // addSomeContact,
  errorCatchingFunction, 
  getContactById,
  removeContact, 
  addContact
  
} = require("./contacts");

const argv = require("yargs").argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      getListOfContacts;
      break;

    case "get":
      errorCatchingFunction(getContactById(id))
      // getSomeContactById(id);
      break;

    case "add":
      errorCatchingFunction(addContact(name, email, phone))
      //removeSomeContact(id);
      break;

    case "remove":
      errorCatchingFunction(removeContact(id))
      // addSomeContact(name, email, phone);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
