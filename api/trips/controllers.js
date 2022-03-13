const Trip = require("../../models/Trip");
const Users = require("../../models/Users");

exports.fetchTrip = async (tripId, next) => {
  try {
    const trip = await Trip.findById(tripId);
    return trip;
  } catch (error) {
    next(error);
  }
};

exports.fetchTrips = async (req, res, next) => {
  try {
    const trips = await Trip.find();
    return res.json(trips);
  } catch (error) {
    next(error);
  }
};

exports.deleteTrip = async (req, res, next) => {
  try {
    await req.trip.remove();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.createTrip = async (req, res, next) => {
  try {
    console.log(req.body.image);
    if (req.file) {
      req.body.image = `/${req.file.path}`;
      req.body.image = req.body.image.replace("\\", "/");
    }
    const { userId } = req.params;
    req.body.user = userId;
    console.log(req.body);
    const newTrip = await Trip.create(req.body);
    await Users.findOneAndUpdate(
      { _id: userId },
      { $push: { trips: newTrip._id } }
    );
    return res.status(201).json(newTrip);
  } catch (error) {}
  // exports.updateTrip = async (req, res, next) => {
  //   try {
  //     if (req.file) {
  //       req.body.image = `/${req.file.path}`;
  //     }
  //     const id = req.trip.id;
  //     const trip = req.body;
  //     const updatedTrip = await Trip.findByIdAndUpdate(id, trip, {
  //       runValidators: true,
  //       new: true,
  //     });
  //     res.status(200).json({
  //       msg: "trip Updated",
  // { _id: tripId }
  //       payload: updatedTrip,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  exports.updateTrip = async (req, res, next) => {
    try {
      const tripId = req.trip._id;
      const updateTrip = await Trip.findByIdAndUpdate(req.body, {
        new: true,
        runValidators: true,
      });
      res.status(200).json(updateTrip);
    } catch (error) {
      //res.status(500).json({ msg: error.message });

      next(error);
    }
  };
};
