const { Router } = require("express");
const asyncHandler = require("express-async-handler");
const { errorHandlingWrapper } = require("../helpers/utils");

const { validate } = require("../helpers/validate");
const {
  createContact,
  getAllContacts,
  findContactById,
  updateContact,
  deleteContactById,
} = require("./contacts.controller");
const {
  createContactSchema,
  updateContactSchema,
} = require("./contacts.schemes");
const router = Router();

router.route("/api/contacts");

router.get("/", asyncHandler(getAllContacts));

router.post("/", validate(createContactSchema), asyncHandler(createContact));

router.get("/:contactId", asyncHandler(findContactById));

router.put(
  "/:contactId",
  validate(updateContactSchema),
  asyncHandler(updateContact)
);

router.delete("/:contactId", asyncHandler(deleteContactById));

exports.usersRouter = router;
