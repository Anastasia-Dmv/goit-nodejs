const {
  hof,
  listOfContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");
hof(listOfContacts);
hof(getContactById(5));
hof(removeContact(6));
hof(addContact("hello", "world", "again"));
