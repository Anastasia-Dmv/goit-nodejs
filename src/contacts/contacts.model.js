const mongoose = require("mongoose");

const { Schema } = mongoose;

const contactsSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  subscription: { type: String, required: true },
  password: { type: String, required: true },
  // token: { type: String, required: true },
});
exports.ContactsModel = mongoose.model("Contact", contactsSchema);
