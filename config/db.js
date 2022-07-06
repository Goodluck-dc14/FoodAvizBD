const mongoose = require("mongoose");
require("dotenv").config();
port = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("database connected...");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose;
