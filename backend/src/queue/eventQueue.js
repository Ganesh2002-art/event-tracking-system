const { Queue } = require("bullmq");
const connection = require("../config/redis");

const eventQueue = new Queue("eventQueue", { connection });

module.exports = eventQueue;
