const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URL);
const db = mongoose.connection;
db.on("error", (error) => {
  console.error("Error connecting to MongoDB:", error);
});
db.once("open", () => {
  console.log("Connected to mongodb");
});

app.use("/api", require("./router/route"));

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
