const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const e = require("express");

//use body parser to read POST HTTP request and JSON params
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.use("*", (req, res) => {
    res.send("404 Not Found");
})

module.exports = app;
