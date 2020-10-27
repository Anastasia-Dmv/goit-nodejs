const { Router } = require("express");
const { signUpSchema, validate, singInSchema } = require("../helpers/validate");

const { signUp, signIn, logOut } = require("./auth.controller");

const router = Router();

router.post("/register", validate(signUpSchema), signUp);
router.post("/login", validate(singInSchema), signIn);
router.delete("/logout", logOut);
exports.authRouter = router;
