const mongoose = require("mongoose");
require("dotenv").config();
port = process.env.PORT || 3000;
const ATLAS = process.env.MONGODB_URI;

mongoose
  .connect(ATLAS)
  .then(() => {
    console.log("database connected...");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose;
