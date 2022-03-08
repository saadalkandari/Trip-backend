const express = require("express");
const userRoutes = require("./api/users/routers");
const bodyParser = require("body-parser");
const connectDB = require("./database");

connectDB();

const app = express();
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Routes
app.use("/api/", userRoutes);

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
