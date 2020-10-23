// const {
//   errorHandlingWrapper,
//   listOfContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   findAndUpdateContact,
// } = require("./contacts.model");
const { ContactsModel } = require("./contacts.model");
exports.createUser = async (req, res, next) => {
  try {
    const newUser = await ContactsModel.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};

exports.getAllContacts = async (req, res, next) => {
  const users = await ContactsModel.find();
  console.log("users", users);
  res.status(200).send(users);
};

exports.findContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await ContactsModel.findById(contactId);
  console.log("contact", contact);
  if (!contact) {
    return res.status(404).send("Contact not found ");
  }
  res.status(200).send(contact);
};

exports.updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await ContactsModel.findByIdAndUpdate(
    contactId,
    req.body,
    { new: true }
  );
  if (!updatedContact) {
    return res.status(404).send("Not found");
  }
  return res.status(200).send(updatedContact);
};

exports.deleteContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await ContactsModel.deleteOne(contactId);
  if (!contact) {
    return res.status(404).send("Not found");
  }
  //await errorHandlingWrapper(removeContact(contactId));
  return res.status(200).send("Contact deleted");
};
