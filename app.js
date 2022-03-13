const express = require("express");
const userRoutes = require("./api/users/routers");
const TripRoutes = require("./api/trips/routes");
const bodyParser = require("body-parser");
const connectDB = require("./database");
const passport = require("passport");
const { localStrategy } = require("./middleware/passport");
connectDB();
const path = require("path");
const dotenv = require("dotenv");

const app = express();
app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
  );
  next();
});
// app.use(express.json());
app.use(passport.initialize());
passport.use(localStrategy);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
//// Routes
app.use("/api", userRoutes);
app.use("/api/trips", TripRoutes);
app.use("/api/media", express.static(path.join(__dirname, "media")));

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
