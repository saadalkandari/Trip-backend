const express = require("express");
const userRoutes = require("./api/users/routers");
const bodyParser = require("body-parser");
const connectDB = require("./database");
const passport = require("passport");
const { localStrategy } = require("./middleware/passport");
connectDB();
const path = require("path");
const dotenv = require("dotenv");
const TripRoutes = require("./api/trips/routes");

const app = express();
// app.use(express.json());
app.use(passport.initialize());
passport.use(localStrategy);
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
