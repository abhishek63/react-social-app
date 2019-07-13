const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use(cookieParser());

//database connecting
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("Database is connected"));

mongoose.connection.on("error", err => {
  console.log("Db connection error = " + err.message);
});

//routes middleware
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
app.use("/api", postRoutes);
app.use("/api", authRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, function() {
  console.log("server is running on ", port);
});
