const mongoose = require("mongoose");

const PinSchema = new mongoose.Schema(
  {
    event: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    type: {
      type: String,
    },
    userId: {
      type: String,
    },
    username: {
      type: String,
    },
    long: {
      type: Number,
      required: true,
    },
    lat: {
      type: Number,
      required: true,
    },
    likes: {
      type: [String],
      default: [],
    },
    images: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pin", PinSchema);