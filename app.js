const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./database");
const TripRoutes = require("./api/trips/routes");

const app = express();
dotenv.config();

app.use(express.urlencoded({ extended: true }));
//// Routes
app.use("/api/trips", TripRoutes);

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
  connectDB();
});
