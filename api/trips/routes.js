const express = require("express");
const passport = require("passport");
const upload = require("../../middleware/multer");
const {
  fetchTrips,
  deleteTrip,
  fetchTrip,
  createTrip,
  updateTrip,
} = require("./controllers");
const router = express.Router();

router.param("tripId", async (req, res, next, tripId) => {
  const trip = await fetchTrip(tripId, next);
  if (trip) {
    req.trip = trip;
    next();
  } else {
    const err = new Error("Trip Not Found");
    err.status = 404;
    next(err);
  }
});

router.get("/", fetchTrips);
router.delete("/:tripId", deleteTrip);
router.post("/:userId", upload.single("image"), createTrip);
// router.put("/:tripId", upload.single("image"), updateTrip);
// router.put(
//   "/:tripId",
//   passport.authenticate("jwt", { session: false }),
//   upload.single("image"),
//   updateTrip
// );

module.exports = router;
