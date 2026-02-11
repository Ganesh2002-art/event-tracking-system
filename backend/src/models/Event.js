const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    type: String,
    metadata: Object,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
