const Joi = require("joi");
const { ContactsModel } = require("./contacts.model");
Joi.objectId = require("joi-objectid")(Joi);

createContact = async (req, res, next) => {
  const checkUniqueEmail = await ContactsModel.findOne({
    email: req.body.email,
  });
  if (checkUniqueEmail) {
    return res.status(409).send("Сontact with the same email already exists");
  }
  const newContact = await ContactsModel.create(req.body);

  res.status(201).json(newContact);
};

getAllContacts = async (req, res, next) => {
  const users = await ContactsModel.find();
  res.status(200).send(users);
};

findContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await ContactsModel.findById(contactId);

  if (!contact) {
    return res.status(404).send("Contact not found ");
  }
  res.status(200).send(contact);
};

updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await ContactsModel.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!contact) {
    return res.status(404).send("Not found");
  }
  return res.status(200).send("Contact was updated ");
};

deleteContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const deleteResult = await ContactsModel.deleteOne({ _id: contactId });
  if (!deleteResult.deletedCount) {
    return res.status(410).send("Not found");
  }

  return res.status(204).send("Contact deleted");
};
module.exports = {
  deleteContactById,
  updateContact,
  findContactById,
  getAllContacts,
  createContact,
};
