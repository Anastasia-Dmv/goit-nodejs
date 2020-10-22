const { Router } = require("express");
const Joi = require("joi");

const {
  validate,
  updateContactSchema,
  createContactSchema,
} = require("../helpers/validate");
const {
  createUser,
  getAllContacts,
  findContactById,
  updateContact,
  deleteContactById,
} = require("./contacts.controller");

const router = Router();

router.route("/api/contacts");

router.get("/", getAllContacts);

router.post("/", validate(createContactSchema), createUser);

router.get("/:contactId", findContactById);

router.put("/:contactId", validate(updateContactSchema), updateContact);

router.delete("/:contactId", deleteContactById);

exports.usersRouter = router;
