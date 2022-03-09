const express = require("express");
const { fetchTrips } = require("./controllers");

const router = express.Router();

router.get("/", fetchTrips);

module.exports = router;
