const { UserModel } = require("../users/users.model");
const bcryptjs = require("bcryptjs");
const { Conflict } = require("../helpers/errors/Conflict.error");
const { NotFound } = require("../helpers/errors/NotFound.error");
const { Forbidden } = require("../helpers/errors/Forbidden.error");

const jwt = require("jsonwebtoken");
const { Unauthorized } = require("../helpers/errors/Unauthorized.error");
exports.signUp = async (req, res, next) => {
  try {
    const { password } = req.body;
    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (existingUser) {
      //return res.status(409).json("Сontact with the same email already exists");
      throw new Conflict("User with such email already exists");
    }
    const passwordHash = await bcryptjs.hash(
      password,
      parseInt(process.env.SALT_ROUNDS)
    );
    const newUser = await UserModel.create({
      email: req.body.email,
      password: passwordHash,
    });
    res.status(201).send({
      id: newUser._id,
      email: newUser.email,
    });
  } catch (err) {
    next(err);
  }
};
exports.signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      //return res.status(409).json("Сontact with the same email already exists");
      throw new NotFound();
    }
    const isCorrectPassword = await bcryptjs.compare(password, user.password);
    if (!isCorrectPassword) {
      throw new Forbidden();
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.cookie("token", token, { httpOnly: true });
    res.status(200).send({
      //   id: user._id,
      email,
      token,
    });
  } catch (err) {
    console.log("err", err);
    next(err);
  }
};

exports.logOut = async (req, res, next) => {
  try {
    if (!req.cookies.token) {
      throw new Unauthorized();
    }
    //const { token } = req.cookies;
    //console.log("token", token);
    //const newToken = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(payload.userId);
    if (!user) {
      throw new Unauthorized();
    }

    req.user = user;

    console.log("logout------------>IAM HERE");
    res.cookie("token", "", { httpOnly: true });
    // req.session.destroy(() => {
    //   res.redirect("/");
    // });

    //console.log("user----------->", user);
    res.status(215).send("token has been just deleted");
    next();
  } catch (err) {
    console.log("err===========>", err);
    next(new Unauthorized("Token is not valid"));
  }
};
