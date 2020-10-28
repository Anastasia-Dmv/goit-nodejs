const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { Schema } = mongoose;

const contactsSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  subscription: { type: String, required: true },
  password: { type: String, required: true },
  // token: { type: String, required: true },
});
contactsSchema.plugin(mongoosePaginate);

exports.ContactsModel = mongoose.model("Contact", contactsSchema);
