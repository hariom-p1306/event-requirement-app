const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventName: String,
  eventType: String,
  date: String,
  location: String,
  venue: String,
  category: String, // planner / performer / crew
  details: Object
}, { timestamps: true });

module.exports = mongoose.model("Event", eventSchema);