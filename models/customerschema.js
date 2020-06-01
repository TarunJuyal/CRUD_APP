const mongoose = require("../db/connection");

const customerSchema = new mongoose.Schema({
  password: { type: String, required: true },
  customerName: { type: String, required: true, maxlength: 20, minlength: 3 },
  emailId: { type: String, required: true, unique: true },
});

const customerModel = mongoose.model("customers", customerSchema);
module.exports = customerModel;
