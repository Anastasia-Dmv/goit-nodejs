const { errorHandlingWrapper } = require("../helpers/utils");
const {
  listOfContacts,
  getContactById,
  removeContact,
  addContact,
  findAndUpdateContact,
} = require("./contacts.model");

exports.createContact = async (req, res, next) => {
  const newContact = await addContact(req.body);
  return res.status(201).json(newContact);
};

exports.getAllContacts = async (req, res, next) => {
  const contacts = await errorHandlingWrapper(listOfContacts);
  return res.status(200).json(contacts);
};

exports.findContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) return res.status(404).json({ message: "Contact not found " });
  res.status(200).json(contact);
};

exports.updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await findAndUpdateContact(contactId, req.body);
  if (!updatedContact) return res.status(404).json({ message: "Not found" });
  return res.status(200).json(updatedContact);
};

exports.deleteContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) return res.status(404).json({ message: "Not found" });
  await removeContact(contactId);
  return res.status(200).json({ message: "Contact has been just deleted" });
};
