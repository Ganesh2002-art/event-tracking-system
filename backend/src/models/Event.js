const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["click", "mousemove", "scroll", "keydown", "page_load"],
    },

    metadata: {
      type: mongoose.Schema.Types.Mixed, // flexible structure
      required: true,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

// Index for faster sorting and queries
eventSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Event", eventSchema);
