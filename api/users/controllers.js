const User = require("../../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../../config/keys");
const Trip = require("../../models/Trip");

exports.signup = async (req, res, next) => {
  try {
    const { password } = req.body;
    const saltRounds = 10;
    req.body.password = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create(req.body);
    const payload = {
      _id: newUser._id,
      username: newUser.username,
      exp: Date.now() + JWT_EXPIRATION_MS,
    };
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.createTrip = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `/${req.file.path}`;
      req.body.image = req.body.image.replace("\\", "/");
    }
    const { userId } = req.params;
    req.body.user = userId;
    const newTrip = await Trip.create(req.body);
    await User.findOneAndUpdate(
      { _id: userId },
      { $push: { trips: newTrip._id } }
    );
    return res.status(201).json(newTrip);
  } catch (error) {
    next(error);
  }
};
