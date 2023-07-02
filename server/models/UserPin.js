const mongoose = require("mongoose");

const UserPinSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
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
    accepted: { 
      type: Boolean, 
      default: false 
    },
    declined: { 
      type: Boolean, 
      default: false 
    },
    status: {
      type: String,
      required: true,
      default: "under review"
    },
    images: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserPin", UserPinSchema);