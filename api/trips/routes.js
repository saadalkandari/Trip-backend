const express = require("express");
const upload = require("../../middleware/multer");
const {
  fetchTrips,
  deleteTrip,
  fetchTrip,
  createTrip,
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
router.post("/", upload.single("image"), createTrip);
module.exports = router;
