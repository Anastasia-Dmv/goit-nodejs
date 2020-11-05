const mongoose = require("mongoose");

const { Schema } = mongoose;
const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatarURL: { type: String },
  subscription: {
    type: String,
    enum: ["free", "pro", "premium"],
    default: "free",
  },
  token: { type: String },
  verificationToken: { type: String },
  isVerified: { type: Boolean, default: false },
});
exports.UserModel = mongoose.model("User", userSchema);
