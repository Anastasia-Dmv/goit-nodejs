const { Router } = require("express");
const { authorize } = require("../helpers/authorize");
const { errorHandlingWrapper } = require("../helpers/utils");
const { validate, subscriptionSchema } = require("../helpers/validate");
const { getCurrentUser, updateCurrentUser } = require("./users.controller");
const router = Router();

router.get("/current", authorize, errorHandlingWrapper(getCurrentUser));
router.patch(
  "/users",
  authorize,
  validate(subscriptionSchema),
  errorHandlingWrapper(updateCurrentUser)
);

exports.usersRouter = router;
