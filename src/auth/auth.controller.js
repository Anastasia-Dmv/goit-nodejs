const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { UserModel } = require("../users/users.model");
const { Conflict } = require("../helpers/errors/Conflict.error");
const { NotFound } = require("../helpers/errors/NotFound.error");
const { Forbidden } = require("../helpers/errors/Forbidden.error");
const { Unauthorized } = require("../helpers/errors/Unauthorized.error");
const { AvatarGenerator } = require("random-avatar-generator");
const generator = new AvatarGenerator();

exports.signUp = async (req, res, next) => {
  try {
    const { password } = req.body;
    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (existingUser) throw new Conflict();
    const passwordHash = await bcryptjs.hash(
      password,
      parseInt(process.env.SALT_ROUNDS)
    );

    const newUser = await UserModel.create({
      email: req.body.email,
      password: passwordHash,
      avatarURL: generator.generateRandomAvatar(`${req.body.email}`), //1st option
      //avatarURL: `https://icotar.com/avatar/${req.body.email}`,     //2nd option ...how to generate avatar
    });

    res.status(201).send({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
      },
    });
  } catch (err) {
    next(err);
  }
};
exports.signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (!user) throw new Unauthorized();

    const isCorrectPassword = await bcryptjs.compare(password, user.password);
    if (!isCorrectPassword) throw new Forbidden();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.cookie("token", token, { httpOnly: true });
    res.status(200).send({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (err) {
    next(err.message);
  }
};

exports.logOut = async (req, res, next) => {
  try {
    if (!req.cookies.token) throw new Unauthorized();

    const payload = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    const user = await UserModel.findById(payload.userId);
    if (!user) throw new NotFound();

    req.user = user;
    res.cookie("token", "", { httpOnly: true });
    return res.status(200).json();
  } catch (err) {
    next(err);
  }
};
