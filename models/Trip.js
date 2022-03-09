const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

const TripSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    image: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  },
  { timestamps: true }
);

TripSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=title%>" });
module.exports = mongoose.model("Trip", TripSchema);
