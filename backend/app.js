require("dotenv").config();
const express = require("express");
const path = require("path");
const fileUpload = require("express-fileupload");
const app = express();
app.use(fileUpload());
app.use("/static",express.static(path.join(__dirname,"static")));
require("./database/connect.js");
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.urlencoded({ limit: '1mb',extended: true }));
app.use(bodyParser.json({limit: '1mb',extended: true}));
const router = require("./router");
app.use(router);

app.listen(8000, (err) => {
  if (!err) {
    console.log("connected");
  }
});
