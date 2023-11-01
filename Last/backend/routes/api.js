const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Admin = require("../models/admin"); // Import the Admin model
const Job = require("../models/job"); // Import the Job model

const jwt = require("jsonwebtoken");
router.post("/auth/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, country, contactNumber, password } =
      req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      country,
      contactNumber,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("User signup error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// Admin login route
router.post("/api/admin/login", async (req, res) => {
  try {
    const { useremail, password } = req.body;

    // Find the admin by useremail
    const admin = await Admin.findOne({ useremail });

    if (!admin) {
      return res.status(401).json({ error: "Admin not found" });
    }

    // Compare the hashed password with the provided password
    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate a JWT token for admin
    const token = jwt.sign(
      { adminId: admin._id },
      process.env.ADMIN_JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({ message: "Admin login successful", token, useremail });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// User login route
router.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare the hashed password with the provided password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate a JWT token with user data
    const useremail = user.email;
    const token = jwt.sign({ userId: user._id }, jwtSecret, {
      expiresIn: "7d",
    });

    res.json({ message: "Login successful", token, useremail });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
