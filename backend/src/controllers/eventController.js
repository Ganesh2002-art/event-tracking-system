const eventQueue = require("../queue/eventQueue");
const Event = require("../models/Event");

exports.captureEvent = async (req, res) => {
  await eventQueue.add("trackEvent", req.body);
  res.json({ message: "Event added to queue" });
};

exports.getEvents = async (req, res) => {
  const events = await Event.find().sort({ createdAt: -1 });
  res.json(events);
};
