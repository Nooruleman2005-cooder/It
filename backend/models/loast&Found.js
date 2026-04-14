const mongoose = require("mongoose");

const lostFoundSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  img: {
    type: String,
  },

  status: {
    type: String,
    enum: ["Pending", "Found"],
    default: "Pending",
  },
}, { timestamps: true });

module.exports = mongoose.model("LostFound", lostFoundSchema);