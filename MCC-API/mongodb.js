const express = require("express");
const mongoose = require("mongoose");

const authRouter = require("./src/routes/auth");
const eventRouter = require("./src/routes/event");

const cors = require("cors");
require("dotenv").config(); 

const app = express();
const port = 9000;

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use("/auth", authRouter);
app.use("/event", eventRouter);

app.get("/", (req, res) => {
  res.send("Welcome to MMC Event API");
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("✅ Connected to MongoDB successfully 🚀");
    app.listen(port, () => {
      console.log(`✅ Server running at http://localhost:${port}/`);
    });
  })
  .catch((error) => {
    console.log("❌ Error connecting to MongoDB: ", error);
  });
