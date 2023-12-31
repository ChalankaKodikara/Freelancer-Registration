const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const Job = require("../models/job"); // Import the Job model

// Get all job details
router.get("/jobs", async (req, res) => {
  try {
    // Fetch all job details from the database
    const jobs = await Job.find();

    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching job details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update the status of a job
router.put("/jobs/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Find the job by ID and update the status
    const updatedJob = await Job.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.status(200).json(updatedJob);
  } catch (error) {
    console.error("Error updating job status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/jobs", async (req, res) => {
  try {
    // Extract job data from the request body, including the status
    const {
      freelancerName,
      jobTitle,
      email,
      location,
      contact,
      jobCategories,
      jobDescription,
      status,
    } = req.body;

    // Create a new Job instance with the status field
    const newJob = new Job({
      freelancerName,
      jobTitle,
      email,
      location,
      contact,
      jobCategories,
      jobDescription,
      status: status || "Pending",
    });

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

// Signout route
router.post("/signout", (req, res) => {
  try {
    // Clear the user's session or token. In your case, it appears you're using JWT tokens.
    // You can optionally implement a session-based approach depending on your use case.
    // For JWT tokens, you can simply let the client remove the token on logout.

    res.status(200).json({ message: "Successfully signed out" });
  } catch (error) {
    console.error("Signout error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get job details for the currently logged-in user
router.get("/jobs", async (req, res) => {
  const useremail = req.cookies.useremail; // Retrieve the user's email from the cookie

  try {
    // Fetch job details for the currently logged-in user from the database
    const jobs = await Job.find({ email: useremail });

    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching job details:", error);
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
