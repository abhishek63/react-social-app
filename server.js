const express = require("express");
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
dotenv.config();
app.use(bodyParser.json());

//database connecting
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("Database is connected"));

mongoose.connection.on("error", err => {
  console.log("Db connection error = " + err.message);
});

//routes middleware
const postRoutes = require('./routes/post');
app.use('/api',postRoutes);

app.listen(5000, function() {
  console.log("server is running");
});
