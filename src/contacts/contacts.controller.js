const Joi = require("joi");
const { ContactsModel } = require("./contacts.model");
Joi.objectId = require("joi-objectid")(Joi);

createContact = async (req, res, next) => {
  const checkUniqueEmail = await ContactsModel.findOne({
    email: req.body.email,
  });
  if (checkUniqueEmail)
    return res
      .status(409)
      .json({ message: "Сontact with the same email already exists" });
  const newContact = await ContactsModel.create(req.body);

  res.status(201).json(newContact);
};

getAllContacts = async (req, res, next) => {
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  const subscription = req.query.subscription || "free";
  const users = await ContactsModel.paginate({ subscription }, { limit, page });
  res.status(200).json(users);
};

findContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await ContactsModel.findById(contactId);
  if (!contact) return res.status(404).json({ message: "Contact not found " });
  res.status(200).json(contact);
};

updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await ContactsModel.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!contact) return res.status(404).json({ message: "Not found" });
  return res.status(200).json({ message: "Contact was updated " });
};

deleteContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const deleteResult = await ContactsModel.deleteOne({ _id: contactId });
  if (!deleteResult.deletedCount)
    return res.status(410).json({ message: "Not found" });
  return res.status(204).json({ message: "Contact deleted" });
};
module.exports = {
  deleteContactById,
  updateContact,
  findContactById,
  getAllContacts,
  createContact,
};
