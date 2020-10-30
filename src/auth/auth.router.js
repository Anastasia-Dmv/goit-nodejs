const { Router } = require("express");
const router = Router();
const { signUpSchema, validate, singInSchema } = require("../helpers/validate");

const { signUp, signIn, logOut } = require("./auth.controller");

router.post("/register", validate(signUpSchema), signUp);
router.post("/login", validate(singInSchema), signIn);
router.delete("/logout", logOut);
exports.authRouter = router;
