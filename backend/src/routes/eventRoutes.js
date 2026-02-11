const express = require("express");
const router = express.Router();
const {
  captureEvent,
  getEvents,
} = require("../controllers/eventController");

router.post("/", captureEvent);
router.get("/", getEvents);

module.exports = router;
