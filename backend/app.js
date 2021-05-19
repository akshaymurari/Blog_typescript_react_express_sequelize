require("dotenv").config();
const express = require("express");
const path = require("path");
const fileUpload = require("express-fileupload");
const app = express();
app.use(fileUpload());
app.use("static/",express.static(path.join(__dirname,"static")));
require("./database/connect.js");
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const router = require("./router");
app.use(router);

app.listen(8000, (err) => {
  if (!err) {
    console.log("connected");
  }
});
