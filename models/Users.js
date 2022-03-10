const { model, Schema } = require("mongoose");
const mongoose = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  trips: [{ type: mongoose.Schema.Types.ObjectId, ref: "Trip" }],
});

module.exports = model("User", userSchema);
