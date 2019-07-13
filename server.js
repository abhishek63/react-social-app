const express = require("express");
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
dotenv.config();

//database connecting
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("Database is connected"));

mongoose.connection.on("error", err => {
  console.log("Db connection error = " + err.message);
});

app.get("/api", function(req, res) {
  res.send("Hello world");
});

app.listen(5000, function() {
  console.log("server is running");
});
