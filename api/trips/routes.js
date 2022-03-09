const express = require("express");
const { fetchTrips, createTrip } = require("./controllers");
const upload = require("../../middleware/multer");

const router = express.Router();

router.get("/", fetchTrips);
router.post("/", upload.single("image"), createTrip);

module.exports = router;
