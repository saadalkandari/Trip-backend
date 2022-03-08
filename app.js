const express = require("express");
const userRoutes = require("./api/users/routers");
const bodyParser = require("body-parser");
const connectDB = require("./database");

connectDB();
const path = require("path");
const dotenv = require("dotenv");
const TripRoutes = require("./api/trips/routes");

const app = express();
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Routes
app.use("/api/", userRoutes);

app.use(express.urlencoded({ extended: true }));
//// Routes
app.use("/api/trips", TripRoutes);

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
