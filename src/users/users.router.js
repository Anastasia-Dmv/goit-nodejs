const { Router } = require("express");
const { authorize } = require("../helpers/authorize");
const { compressImages } = require("../helpers/compressImage");
const { upload } = require("../helpers/compressImage");
const { errorHandlingWrapper } = require("../helpers/utils");
const {
  validate,
  subscriptionSchema,
  //updateAvatarSchema,
} = require("../helpers/validate");
const {
  getCurrentUser,
  updateCurrentUser,
  updateCurrentUserAvatar,
} = require("./users.controller");
const router = Router();

router.get("/current", authorize, errorHandlingWrapper(getCurrentUser));
router.patch(
  "/users",
  authorize,
  validate(subscriptionSchema),
  errorHandlingWrapper(updateCurrentUser)
);
router.patch(
  "/avatar",
  authorize,
  //validate(updateAvatarSchema),
  upload.single("avatar"),
  compressImages,
  errorHandlingWrapper(updateCurrentUserAvatar)
);

exports.usersRouter = router;
