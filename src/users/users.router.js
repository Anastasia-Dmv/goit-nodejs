const { Router } = require("express");
const { authorize } = require("../helpers/authorize");
const { errorHandlingWrapper } = require("../helpers/utils");
const { getCurrentUser, updateCurrentUser } = require("./users.controller");
const router = Router();

router.get("/current", authorize, errorHandlingWrapper(getCurrentUser));
router.patch("/users", authorize, errorHandlingWrapper(updateCurrentUser));

exports.usersRouter = router;
