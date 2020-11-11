"use strict";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const MapRoutes = require("./routes/MapRoutes");
const google = require("googleapis");
const cors = require("cors");
const { Client } = require("@googlemaps/google-maps-services-js");

const client = new Client({});

//use body parser to read POST HTTP request and JSON params
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, "docs")));
app.use("/api/map", MapRoutes);
app.use("/api", (req, res) => {
	res.send("Welcome to our API page");
});

app.use("*", (req, res) => {
	res.send("404 Not Found");
});

module.exports = app;
