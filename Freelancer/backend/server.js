const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const apiRoutes = require("./routes/api");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use("/api/auth", authRoutes);
app.use("/api", apiRoutes); // Include the new API routes

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
