const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config({ path: "./config/.env" });
require("./v1/models/db");

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Expose-Headers", "x-token");
  next();
});

app.use((req, res, next) => {
  res.header("Access-Control-Expose-Headers", "x-accesstoken, x-refreshtoken");
  next();
});

app.use(express.static("uploads"));

app.use("/api/v1", require("./v1"));

const PORT = process.env.PORT || 9898;

app.listen(PORT, () => {
  console.log(`server is listinig on port ${PORT}`);
});
