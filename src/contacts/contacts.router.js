const { Router } = require("express");
const Joi = require("joi");

const {
  validate,
  updateContactSchema,
  createContactSchema,
  validateIdSchema,
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

router.get(
  "/:contactId",
  // validate(validateIdSchema, "params"),
  findContactById
);

router.put(
  "/:contactId",
  //validate(validateIdSchema, "params"),
  validate(updateContactSchema),
  updateContact
);

router.delete(
  "/:contactId",
  //validate(validateIdSchema, "params"),
  deleteContactById
);

exports.usersRouter = router;
