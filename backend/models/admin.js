const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    useremail: String, // Change 'username' to 'useremail'
    password: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", adminSchema);
