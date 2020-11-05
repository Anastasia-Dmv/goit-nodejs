const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { UserModel } = require("../users/users.model");
const { Conflict } = require("../helpers/errors/Conflict.error");
const { NotFound } = require("../helpers/errors/NotFound.error");
const { Unauthorized } = require("../helpers/errors/Unauthorized.error");
const { AvatarGenerator } = require("random-avatar-generator");
const generator = new AvatarGenerator();
const { uuid } = require("uuidv4");
const sgMail = require("@sendgrid/mail");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

exports.signUp = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) throw new Unauthorized();
    const passwordHash = await bcryptjs.hash(
      password,
      parseInt(process.env.SALT_ROUNDS)
    );

    const newUser = await UserModel.create({
      email,
      password: passwordHash,
      avatarURL: generator.generateRandomAvatar(`${req.body.email}`), //1st option
      //avatarURL: `https://icotar.com/avatar/${req.body.email}`,     //2nd option ...how to generate avatar
      verificationToken: uuid(),
    });
    await sendVerificationEmail(email, newUser.verificationToken);
    res.status(201).json({
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
    const user = await UserModel.findOne({ email });
    if (!user) throw new Unauthorized();

    const isCorrectPassword = await bcryptjs.compare(password, user.password);
    if (!isCorrectPassword) throw new Unauthorized();
    if (!user.isVerified) {
      return res.status(403).json("Your email is not verified");
    }
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
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: -1,
    });
    res.cookie("token", token, { httpOnly: true });
    return res.status(200).json();
  } catch (err) {
    next(err);
  }
};
//==============

//=================
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

//=========
exports.verifyEmail = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await UserModel.findOneAndUpdate(
      { verificationToken },
      { isVerified: true, verificationToken: null }
    );
    if (!user) throw new NotFound();
    res.status(200).json("User successfully verified");

    // await UserModel.updateOne({ verificationToken }, { isVerified: true });
    // await UserModel.updateOne(
    //   // { verificationToken },
    //   { verificationToken: null }
    // );
    return;
  } catch (err) {
    next(err);
  }
};

async function sendVerificationEmail(email, verificationToken) {
  // const verificationToken = uuid.v5();
  // const user = await UserModel.findByIdAndUpdate(
  //   req.user.id,
  //   { verificationToken: verificationToken },
  //   { new: true }
  // );
  const verificationLink = `http://localhost:3000/api/v1/auth/verify/${verificationToken}'`;

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: email, // Change to your recipient
    from: "vesta50000@gmail.com", // Change to your verified sender
    subject: "Email verification",
    text: "and easy to do anywhere, even with Node.js",
    html: `<a href='${verificationLink}'>Click here</a>`,
  };
  await sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
}
