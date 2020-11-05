const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { uuid } = require("uuidv4");
const sgMail = require("@sendgrid/mail");
const path = require("path");
const { UserModel } = require("../users/users.model");
const { NotFound } = require("../helpers/errors/NotFound.error");
const { Unauthorized } = require("../helpers/errors/Unauthorized.error");
const { AvatarGenerator } = require("random-avatar-generator");

require("dotenv").config({ path: path.join(__dirname, "../.env") });
const generator = new AvatarGenerator();
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
      avatarURL: generator.generateRandomAvatar(`${req.body.email}`),
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

exports.verifyEmail = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await UserModel.findOneAndUpdate(
      { verificationToken },
      { isVerified: true, verificationToken: null }
    );
    if (!user) throw new NotFound();
    res.status(200).json("User successfully verified");
    return;
  } catch (err) {
    next(err);
  }
};

async function sendVerificationEmail(email, verificationToken) {
  const verificationLink = `http://localhost:3000/api/v1/auth/verify/${verificationToken}'`;

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: email,
    from: "vesta50000@gmail.com",
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
