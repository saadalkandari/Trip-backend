const express = require("express");
const { signup, signin, createTrip } = require("./controllers");
const passport = require("passport");

const router = express.Router();
const upload = require("../../middleware/multer");

router.post("/signup", signup);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);
router.post("/trips/:userId", upload.single("image"), createTrip);

module.exports = router;
