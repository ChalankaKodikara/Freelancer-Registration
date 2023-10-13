const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  freelancerName: String,
  jobTitle: String,
  email: String,
  location: String,
  contact: String,
  jobCategories: String,
  jobDescription: String,
});

module.exports = mongoose.model("Job", jobSchema);
