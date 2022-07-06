require("./config/db");
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 4000;
const Route = require("./router/BusinessRouter");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to FoodAviz server");
});

app.use("/api", Route);

app.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});
