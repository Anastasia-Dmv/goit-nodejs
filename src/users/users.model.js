const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  subscription: {
    type: String,
    enum: ["free", "pro", "premium"],
    default: "free",
  },
  token: { type: String },
});
exports.UserModel = mongoose.model("User", userSchema);
