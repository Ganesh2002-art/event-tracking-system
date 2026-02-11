require("dotenv").config();
const mongoose = require("mongoose");
const { Worker } = require("bullmq");
const connection = require("../config/redis");
const Event = require("../models/Event");

mongoose.connect(process.env.MONGO_URI);

const worker = new Worker(
  "eventQueue",
  async (job) => {
    await Event.create(job.data);
    console.log("Event saved:", job.data.type);
  },
  {
    connection,
  }
);

console.log("Worker running...");
