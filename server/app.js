const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("./db/conn");

const app = express();

const PORT = process.env.PORT;

// Allow JSON data to make communication with API. Allow the JSON data in a request by adding middleware for the body parser.
app.use(express.json()); // so that express can understand JSON
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" })); // will allow reqs from the stated origin; NOTE: will come b4 the nxt line
app.use(require("./routes/auth")); // here we link the route files // working as a middleware

app.listen(PORT, () => {
  console.log("Server is up and listening on port " + process.env.PORT);
});
