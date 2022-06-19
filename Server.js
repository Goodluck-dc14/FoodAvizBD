require("./config/db");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome to FoodAviz API");
});

app.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});
