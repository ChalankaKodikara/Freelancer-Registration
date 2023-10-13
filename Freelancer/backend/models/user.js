const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    country: String,
    contactNumber: String,
    password: String,
    token: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
