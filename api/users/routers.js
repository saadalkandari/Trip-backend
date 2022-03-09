const express = require("express");
const { signup, createTrip } = require("./controllers");
const router = express.Router();
const upload = require("../../middleware/multer");

router.post("/signup", signup);
router.post("/trips/:userId", upload.single("image"), createTrip);

module.exports = router;
