require("dotenv").config();
const mongoose = require("mongoose");

console.log("MONGODB_URL =", process.env.MONGODB_URL);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("✅ Connected to MongoDB successfully 🚀"))
  .catch((err) => console.error("❌ Error connecting to MongoDB:", err));
