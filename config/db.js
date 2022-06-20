const mongoose = require("mongoose");
require("dotenv").config();
port = process.env.PORT || 3000;
const uri = process.env.URI;

mongoose
  .connect(uri)
  .then(() => {
    console.log("database connected...");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose;
