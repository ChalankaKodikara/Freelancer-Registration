const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Admin = require("./models/admin");
require("dotenv").config(); // Load environment variables from .env file

mongoose.connect(process.env.MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const adminData = {
  useremail: "admin", // Change the field name to 'useremail'
  password: "504678",
};

bcrypt.hash(adminData.password, 10, (err, hashedPassword) => {
  if (err) {
    console.error("Error hashing password:", err);
    mongoose.connection.close();
    return;
  }

  const admin = new Admin({
    useremail: adminData.useremail, // Change the field name to 'useremail'
    password: hashedPassword,
  });

  admin
    .save()
    .then(() => {
      console.log("Admin account created successfully");
    })
    .catch((error) => {
      console.error("Error creating admin account:", error);
    })
    .finally(() => {
      mongoose.connection.close();
    });
});
