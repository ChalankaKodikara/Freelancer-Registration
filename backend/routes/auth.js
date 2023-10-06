const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const Job = require("../models/job"); // Import the Job model

// Create a new job
router.post("/jobs", async (req, res) => {
  try {
    const jobData = req.body;

    // Create a new Job instance
    const newJob = new Job(jobData);

    // Save the job to the database
    await newJob.save();

    res.status(201).json({ message: "Job request submitted successfully!" });
  } catch (error) {
    console.error("Error submitting job request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Generate a random JWT secret key
const jwtSecret = crypto.randomBytes(32).toString("hex");

// Middleware to verify JWT token
function authenticateJWT(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded; // Attach the user data to the request
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

// Signup route
router.post("/signup", async (req, res) => {
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

// User login route
router.post("/login", async (req, res) => {
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
