const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    freelancerName: String,
    jobTitle: String,
    content01: String,
    content02: String,
    content03: String,
    content04: String,
    content05: String,
    aboutTheJob: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
