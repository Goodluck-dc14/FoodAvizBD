const mongoose = require("mongoose");
port = process.env.PORT || 3000;
const url = "mongodb://localhost/FoodAvizDB";

mongoose.connect(url).then(() => {
  console.log("database connected...");
});

module.exports = mongoose;
